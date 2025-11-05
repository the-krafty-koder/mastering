Storage systems fall into 3 categories

1. Block storage - HDD and SSDs that are attached to a physical device.
2. File storage - built on top of block storage. Provides a higher level of abstraction to handle files and directories.
3. Object storage - stores all data as objects in a flat structure. Targets cold data and is mainly used for archives and backups. Data access provided via REST API. Slower than other storage types.

# Functional requirements

- Should contain the following features
  1. Bucket creation
  2. Object uploading and downloading
  3. Object versioning
  4. Listing objects in a bucket.
- Should store both massive objects and a large number of small objects.
- Should store approximately 100PB of data in a year.

# Non functional requirements

- High data durability
- High service availability
- Storage efficiency -> reduce storage costs while maintaining high reliability and performance.

# Properties of object storage

1. Immutability - either delete or replace with a new version. No incremental operations.
2. Key-Value store - use object URI to retrieve data.
3. Write once read many times access pattern
4. Supports both small and large objects.

# High level design

                   User
                    |
                    |
                Load balancer                                           (secondary)
                    |                          Data Store service ---> Storage node
                    |                                      |
                    |                                      >
    Identity <---- API Service --------------> Data Store service ---> Storage node
    & access mgmt   |                                      |
                                                           >
                    |                          Data Store service ---> Storage node
             ---------------------                                      (secondary)
            |    Metadata service |
            |          |          |
            |     Metadata DB     |
            ----------------------

1. Load balancer - distributes RESTFUL API requests
2. API Service - orchestrates RPCs to IAM service, metadata and storage stores
3. IAM - handles authentication, authorization and access control.
4. Data store - stores and retrieves actual data.
5. Metadata store -> stores object metadata.

# Uploading an object

1. Client sends a PUT request to create a bucket
2. API service calls the IAM to ensure user is authorized.
3. The API service calls the metadata store to create an entry with the bucket info
   in the metadata database. Once the entry is created, a success message is returned to the client.
4. Client sends HTTP PUT to create script.txt.
5. API verifies identity and WRITE permission.
6. If valid, data is sent to the data store and stored as an object (returns UUID).
7. API updates metadata store with object UUID, bucket ID, name, etc.

# Donwloading an object

1. Client sends GET request for bucket-to-share/script.txt.
2. API checks IAM for READ access.
3. If valid, gets object UUID from metadata store.
4. Fetches object data from data store using UUID.
5. Returns data to client in HTTP response.

# Design deep dive

1.  Data store

                  -----------------------------------------------------
                 |                                                     |
                 |                                  heartbeat          >
                 |                            ----------------> Data node secondary
                 |                           |             hbt
        Data routing service -------> Placement service ------> Data node primary
                                             |
                                              ----------------> Data node secondary
                                                heartbeat

a: Data routing service -> provides RESTFUL or gRPC APIs to access data node cluster. It is stateless. Does the following:

    - Query the placement service to get the best data node to store data.
    - Read data from data nodes and return it to the API service.
    - Write data to data nodes.

b: Determines which data nodes ( primary & replica ) should be used to store an object. Uses a virtual cluster map which contains topology of the cluster.Placement service monitors all nodes via heartbeats. Since it is critical, it is crucial to have a cluster of 5-7 placement nodes with Paxos/Raft consensus protocol.

c: Data node -> stores actual object data. Replication is done to ensure durability.

## How data is persisted

1. API sends object data to data store.
2. Data routing generates UUID, gets target node from placement service.
3. Data sent to primary node with UUID.
4. Primary saves data, replicates to 2 secondary nodes.
5. Once replication succeeds, UUID is returned to API.

- Data is stored as files on physical drives inside data nodes.
- Placement service uses consistent hashing to deterministically map UUID to a replication group, even as groups change.Primary node waits for all replicas before responding, ensuring strong consistency. Strong consistency increases latency, as response depends on the slowest replica.

## How data is organized

- Each data node avoids creating a file per object to prevent wasted space and inode exhaustion. Small files consume full disk blocks and quickly use up limited inodes. Instead, objects are appended to a shared write-ahead log file. When the file reaches a size limit, it's marked read-only, and a new file is started. This improves efficiency and scalability.

## How data is looked up

- To find an object by UUID, the data node needs:
  data file, offset, and size.
- Two options for storing this mapping:
  1. RocksDB: fast writes, slower reads.
  2. Relational DB: slower writes, fast reads (better for write-once, read-many).
- Mapping is local to each node, so no need for a shared DB.
- Solution: use SQLite on each node — lightweight, file-based, and easy to manage.

# Durability

Data reliability is extremely important.

1. Hardware failure

   - Replicate data across multiple hard drives, preferably 3.
   - Instead of just replicating data (like 3x replication), data is split, encoded, and stored across multiple nodes so it can be reconstructed even if some parts are lost.

2. Data corruption - use a checksum algorithm eg MD5 on the data before and after
   transmission to verify correctness.

# Metadata data model

Database schema needs to support:

    1. Finding object id by object name.
    2. Inserting and deleting object based on object name.
    3. List objects in a bucket sharing the same prefix.

- Usually a limit on how many buckets a user can have.Spread read request load on the bucket table amongst multiple db servers.
- Shard the object table

# Object versioning

- To support versioning, the object table for the metadata store has a column called
  object_version that is only used if versioning is enabled. Instead of overwriting the existing record, a new record is inserted with the same bucket_id and object_name as the old record, but with a new object_id and object_version.
- When we delete an object, all versions remain in the bucket and we insert a delete marker.
- A delete marker is a new version of the object, and it becomes the current version of the object once inserted. Performing a GET request when the current version of the object is a delete marker returns a 404 Object Not Found error.

# Optimizing upload of large files

- Use a multipart upload. Slice a large object into smaller parts and upload independently. After all the parts are uploaded, the object store re-assembles the object from the parts.

# Garbage collection

- Process of automatically reclaiming storage space no longer used. Few things can cause this:
  1. An object is marked as deleted via a delete marker without actually being deleted.
  2. Orphan data - half uploaded multipart uploads.
  3. Corrupted data - data that failed checksum verification.
