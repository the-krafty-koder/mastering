# Key Value Store

It is a non-relational DB that stores key-value pairings.

# Functional requirements

1. Ability to store big data.
2. Size of a key value pair is small (10kb)

# Non-functional requirements

1. High availability.
2. High scalability.
3. Low latency.
4. Automatic scaling.

# Single server key value store

- Store key value pairs in a hash table whcih resides in memory. Optimize to fit more data in a single server via:
  1. Data compression.
  2. Storing only frequently accessed data in memory, the rest on disk.
- A single server can still reach capacity quickly though, so use distributed server.

# Distributed key value store

- Distributes key value pairs across many servers. It is important to use the CAP theorem to implement.

# Design

                                                 -----> node
                                                |
                                                |
        Client ---------------> coordinator node -----> node
                                                |
                                                |
                                                 -----> node

1. Clients communicate with the key-value store using simple APIs.
2. Coordinator node acts as a proxy between client and the key-value store.
3. Nodes are distributed on a hash ring using consistent hashing for data replication, partitioning and automated scaling.

Write path

- When a write request is directed to a specific node:
  1. The write request is persisted to a commit log file.
  2. Data is saved in a memory cache.
  3. When the memory cache is full, data is flushed to disk.

Read path

1. System first checks if data is in memory
2. If not in memory data is retrieved from the disk.

# System components

1. Data partition

- Data is split into partitions and stored in multiple servers. 2 challenges arise

  1. Distribute data across multiple servers evenly.
  2. Minimize data movement when nodes are added or removed.

- Consistent hashing can be used to solve these problems.

                How it works

  1.  Servers are mapped on a hash ring using a hash function f
  2.  A key is then hashed onto the same ring, and it is stored on the first server encountered while moving in the clockwise direction.

                Issues with the basic consistent hashing approach

  - The size of the partitions assigned to each server on the ring is not even therefore keys might not be distributed evenly.
  - Solution is to use virtual nodes. Each server has multiple nodes responsible for multiple partitions, which are not necessarily in sequence.
  - As the number of virtual nodes increases, the distribution of keys becomes more balanced.

                Advantages of consistent hashing

  4.  Servers could be added and removed automatically depending on the load.
  5.  The number of virtual nodes of a server is proportional to server capacity.

2. Data replication
   To achieve high availability, data has to be replicated across servers. It is achieved by storing the data in the first N servers clockwise after a key is mapped onto a position in the hash ring.

3. Consistency.

- Use quorum consensus to guarantee consistency for both read and write operations.

  N = The number of replicas
  W = A write quorum of size W. For a write operation to be considered as successful, write operation must be acknowledged from W replicas.
  R = A read quorum of size R. For a read operation to be considered as successful, read operation must wait for responses from at least R replicas.

  If R = 1 and W = N, the system is optimized for a fast read.
  If W = 1 and R = N, the system is optimized for fast write.
  If W + R > N, strong consistency is guaranteed (Usually N = 3, W = R = 2).
  If W + R <= N, strong consistency is not guaranteed.

4. Handling failures

- Use gossip protocol to detect failures of nodes.

  How it works

  - Each node maintains a membership list containing memberIds and heartbeat counters.
  - Each node periodically increments its heartbeat counter, and sends heartbeats to random nodes, which in turn propagate to other nodes.
  - Nodes update their membership list when they receive heartbeats. If a heartbeat is not increased for a duration of time, that node is considered offline.

- To handle temporary failures, use sloppy quorum approach. Instead of enforcing
  the quorum requirement, the system chooses the first W healthy servers for writes and first R healthy servers for reads on the hash ring. Offline servers are ignored.

- Replicate data across multiple data centres to handle data centre outage.
