# Reasons for replication

1. To improve reliability - Incase one replica crashes, work continues by switching to another replica.
2. To improve perfomance - important when a distributed system needs to scale in terms of size or geographical area it covers. Scaling by size occurs for example when multiple processes need to access data managed by a single server. Replicating the servers distributes load and increases perfomance. Replication by geographical location makes data available closer to a process requiring it, improve perfomance by minimizing network latency.

# Disadvantages of replication

1. Main one is that multiple replicas lead to data consistency/synchronization problems. When a copy is modified, that copy becomes different, therefore modifications have to be carried out to all copies to ensure consistency. This created a dilemna, replication can improve perfomance but leads to consistency problems. The accepted solution is to replicate but to weaken consistency rules. The price paid is that copies may not always be the same everywhere.

# Consistency models \* repeat via video

## Data centric consistency models

1. Sequential consistency
   The result of any execution is the same as if the (read and write) operations by all processes on the data store were executed in some sequential order and the operations of each individual process appear in this sequence in the order specified by its program.

2. Causal consistency
   Operations that are potentially dependent on each other are carried out in the order of that dependency.

3. Eventual consistency
   Lacking write-write conflicts, all replicas will converge towards identical copies of each other.

## Client centric consistency models

Provides guarantees for a single client concerning the consistencies of access to a data store by that client. No guarantees are given concerning concurrent accesses by different clients. Solves the problem that users may sometimes operate on different replicas, while
updates have not been fully propagated.

1. Monotonic reads
   If a process reads the value of data item x, any successive read operation on x by that process will always return the same value or a more recent value.

2. Monotonic writes
   A write operation by a process on a data item x is completed before any successive write operation by the same process, regardless where the successive write operation takes place.

3. Read your writes
   The effect of a write operation by a process on data item x will always be seen by a successive read operation on x by the same process. In other words, a write operation is always completed before a successive read operation by the same process, no matter the location where that read operation takes place.

4. Writes follow reads
   Any successive write operation by a process on a data item
   x will be performed on a copy of x that is up to date with the value most recently read by that process.

# Replica management

Involve finding the best location for servers and finding the best servers to place content.

1. Finding best server location

- Use quality of service
- Use consistency awareness - placement of servers will then involve costs for keeping replicated content up to date.
- Use energy metrics - decided based on energy consumption.

2. Content distribution

- Design concern - what actually needs to be propagated to other servers?

  1. Notification about an update operation
     It is what invalidation protocols do. Copies are informed that an update has taken place and the data they hold is invalid. Main advantage is that they use little network bandwidth. The only information that needs to be transferred is a specification of which data are no longer valid.

  2. Propagating updated data
     Useful when read-write ratio is relatively high

  3. Propagating update operation with values to update
     Tell each replica which update operation it should perform (and sending only the parameter values that those operations need).

- Push vs Pull based protocols
  In a push-based approach, also referred to as server-based protocols, updates are propagated to other replicas without those replicas even asking for the updates. Often used between permanent and server-initiated replicas

  In a pull-based approach, a server or client requests another
  server to send it any updates it has at that moment. Pull-based protocols, also called client-based protocols, are often used by client caches.

# Consistency protocols

Implementation of consistency models

# Implementing data centric consistency models

## Sequential consistency: Primary based protocols

In these protocols, each data item x in the data store has an
associated primary, which is responsible for coordinating write operations on x.

### Remote write protocols

All write operations need to be forwarded to a fixed single server (primary). The primary performs the update for x on its local copy and propagates the change to backup servers. Each backup server performs
the update as well, and sends an acknowledgment to the primary. When all
backups have updated their local copy, the primary sends an acknowledgment to the initial process, which, in turn, informs the client.

    Disadvantage
    It may take a long time before the process that initiated the update is allowed to continue. ( A blocking operation).

    An alternative is to use a nonblocking approach. As soon as the primary has updated its local copy of x, it returns an acknowledgment. After that, it tells the backup servers to perform the update as well. The problem with non-blocking approach is fault tolerance. The update process doesnt know for sure that backup servers have been updated as well.

- Primary-backup protocols provide a straightforward implementation of
  sequential consistency, as the primary can order all incoming writes in a globally unique order. Evidently, all processes see all write operations in the same order, no matter which backup server they use to perform read operations.

### Local write protocols

The primary copy migrates between processes that want to write data.Whenever a process wants to update a data item x, it locates the
primary copy of x, and subsequently moves it to its own location.

    Advantages
    Multiple succesive write operations can be carried out locally, while reading processes can still access their local copy.However, such an improvement can be achieved only if a nonblocking protocol is followed by which updates are propagated to the replicas after the primary has finished with locally performing the updates.

## Sequential consistency: Replicated write protocols

Write operations can be carried out at multiple replicas instead of only one. A distinction can be made between active protocols and consistency protocols based on majority voting.

## Active replication

Each replica has an associated process that carries out update operations. In contrast to other protocols, update happens by propagating the update operation, not the update itself.

    Disadvantages
    - Operations need to be carried out in the same order everywhere.Consequently, what is needed is a totally ordered multicast mechanism. A practical approach to accomplish total ordering is by a central coordinator, also called a sequencer. One approach is to first forward each operation to the sequencer, which assigns it a unique sequence number and subsequently forwards the operation to all replicas.Operations are carried out in the order of their sequence number.

## Quorum based protocols

A different approach to support replicated writes is to use voting. Requires clients to request and acquire the permission of multiple servers before either reading or writing a replicated data item.

To read a file of which N replicas exist, a client needs to assemble a read quorum, an arbitrary collection of any Nr servers, or more.Similarly, to modify a file, a write quorum of at least Nw servers is required

# Implementing client-centric consistency.

Implementing it is very straightforward if perfomance issues are ignored.

Each write operation W is assigned a globally unique identifier by the server to which a write has been submitted. For each client, we keep track of 2 sets of writes:

    - The read set for a client consists of the writes performed by a client. relevant for the read operations.
    - The write set consists of the (identifiers of the) writes performed by the client.

## Implementing monotonic reads

When a client wants to perform a read operation at a server, that server is handed the clients read set to check if all identified writes have taken place locally. If not, it contacts the other servers to ensure that it is brought up to date before carrying out the read operation

Alternatively, the read operation is forwarded to a server where the write operations have already taken place.After the read operation is performed, the write operations that have taken place at the selected server and which are relevant for the read operation are added to the client’s read set.

## Implementing monotonic writes

Whenever a client initiates a new write operation at a server, the
server is handed over the client’s write set. It then ensures that the identified write operations are performed first and in the correct order. After performing the new operation, that operation’s write identifier is added to the write set.

## Implementing read-your-writes

The server where the read operation is to be performed has seen all the write operations in the client’s write set. The writes can simply be fetched from other servers before the read operation is actually executed, although this may lead to a poor response time.

## Writes follow reads

Implemented by first bringing the selected server up to date with the write operations in the client’s read set, and then later adding the identifier of the write operation to the write set,along with the identifiers in the read set (which have now become relevant
for the write operation just performed).

N/B
Query containment check - whether data from a query can be satisfied by a local copy of the data in an edge server
