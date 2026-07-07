# Synchronization

Process synchronization - making sure that one process waits for another to finish operation.
Data synchronization - ensuring two sets of data are the same.

# Coordination

Managing interactions and dependencies between activities in a distributed system.

# Contention

Prevent concurrent access of a resource, or making it inconsistent.

## Contention mechanisms

Mutex locks - Are of 2 types

1. Token based - involves passing a special message between processes (token). There is only one token available, and whoever has it has access to the shared resource.

   Advantages

   1. They guarantee that every process will get a chance at the resource (prevent starvation)
   2. Can easily avoid deadlocks ( several processes indefinitely waiting for each other to proceed)

   Disadvantage

   1. When the token is lost, the distributed system needs to be restarted to ensure the token is recreated.

2. Permision based - a process wanting to access a resource first requires permission from other resources.

## Algorithms for mutex exclusion

1. Centralized algorithm
   1 process is elected coordinator. If a process wants access to a resource, it sends a message to the coordinator. If the resource is free, the coordinator sends back a request granting permission. If another process asks for permission to the shared resource, the coordinator knows that it is being accessed, so cannot grant the request. It can deny in different ways, send an outright denial or refrain from responding - keeping the requesting processing in a blocking state.

2. Distributed algorithm
   When a process wants to access a shared resource, it builds a message containing the name of the resource, its process
   number, and the current (logical) timE. It then broadcasts the message to all other processes, including itself, asking for permission.

   When a process receives a request message from another process, the
   action it takes depends on its own state regarding the resource named in the message. Three different cases have to be clearly distinguished:

   • If the receiver is not accessing the resource and does not want to access
   it, it sends back an OK message to the sender.
   • If the receiver already has access to the resource, it simply does not reply.
   Instead, it queues the request.
   • If the receiver wants to access the resource as well but has not yet done so, it compares the timestamp of the incoming message with the one contained in the message that it has sent everyone. The lowest one wins.

   If the incoming message has a lower timestamp, the receiver sends back an OK message. If its own message has a lower timestamp, the receiver queues the incoming request and sends nothing.
   After sending out requests asking permission, a process sits back and waits until everyone else has given permission. As soon as all the permissions are in, it may go ahead. When it is finished, it sends OK messages to all processes in its queue and deletes them all from the queue.

   Disadvantages.
   If any process P fails, the silence will be interpreted as a denial of permission, blocking all subsequent requests by all processes to access a resource.

3. Token ring algorithm
   Processes are organized into a ring. WHen the ring is initialized, the first process is given a token. If the process needs acess to a resource, it accesses the resource and frees the token to the next process when done, else it just passes the token to the next process.

   Advantages

   1. Only 1 process has the token at any given time, so only one has access to a shared resource.
   2. Starvation cannot occur since the token travels to every process.

   Disadvantages
   If the token is lost, regeneration is required. Detecting it is lost may be difficult, since the amount of time between successive appearances of the token on the network is unbounded

# Examples

Zookeeper - simple locking mechanism

# Election algorithms

Algorithms for electing a coordinator. In general, election algorithms
attempt to locate the process with the highest identifier and designate it as coordinator.

    1. Bully algorithm
    When any process locates the coordinator is no longer active, it initiates an election for the processes with a higher identifier than it by sending an ELECTION message. If no process responds, it becomes the automatic coordinator, otherwise if a process responds its job is done. Every process is open to receiving ELECTION messages. If a process receives it, it sends an OK message to the sender and takes over. It then holds an election and eventually, all processes give up but one, and that one is the new coordinator.
    It announces its victory by sending all processes a message telling them that starting immediately it is the new coordinator.


    2. Ring algorithm
    Whenever a process detects that the coordinator is down, it sends an ELECTION message to its successive processes in the ring. If a process is down, it is skipped over. Every process attaches an identifier to the message and sends it through the ring. When it gets back to the initial process, the process with the highest identifier is chosen and a COORDINATOR message is sent across the ring.

# Distributed event matching

Publishing the notification of an event when that event occurrs to processes subscribed to it.

    ## Centralized implementation
    Involves a central server that handles all subscriptions and notifications. A subscriber submits a subscription for storage, when publisher submits a notification, that notification is checked against every subscription, and when match is found, that notification is copied and sent to the subscriber

# Deadlocks

- When 2 or more programs get stuck, each waiting for the other to release resources, so none of them can proceed.

  Deadlock avoidance

  - Resource ordering -> assign a global order to resources (e.g., LockA = 1, LockB = 2) and always acquire multiple locks in that same order. It prevents circular wait because threads cannot wait on a lower-numbered lock while holding a higher-numbered one.
  - Hold and wait prevention -> avoid holding one resource while waiting for another.
  - Use try-locks with timeouts -> instead of blocking indefinitely, try acquiring a lock with a timeout. If unavailable, release held locks and try later.

  Deadlock detection

  - If theres a single instance of a resource, run algorithms to check for cycles in the resource allocation graph.The presence of a cycle signifies deadlock presence.
  - If there are multiple instances, Bankers algorithm can be used to periodically check for deadlocks.
  - Wait for Graph algorithm can be used where resources have multiple instances. The WAG is a directed graph that represents dependencies between processes.

  Deadlock recovery

  - Killing processes involved in the deadlock.
  - Process rollback - rollback deadlocked processes to previous states where deadlocked condition did not exist.
  - Resource preemption - temporarily taking a resource away from a process or thread, usually by the OS, so another process can use it.
  - Concurrency control mechanisms to manage shared access to resources.

  Advantages of deadlock recovery

  1. Improved system stability.
  2. Better resource utilisation.

  Disadvantages

  1. Performance overhead - detection and recovery algos can introduce overhead in terms of performance.
  2. Complexity - detection and recovery algos can be difficult to implement.
  3. Risk of data loss if processes are rolled back.

# Race condition

When multiple processes have access to shared data and they try to modify that data at the same time.

Critical section -> a code part where the shared resources are accessed.

Preventing race conditions

1.  Use mutex locks
2.  Proper synchronization -> ensure processes or threads work in a coordinated sequence when accessing shared data.
3.  Priority management -> prioritise certain processes so they get controlled access to critical resources.
