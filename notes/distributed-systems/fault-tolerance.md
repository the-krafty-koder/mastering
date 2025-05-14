# Definitions

Fault tolerance - The ability of a system to operate normally when some components have failed.
Availability - the property that a system is ready to be used at any given time.
Reliability - the property that a system can run continously without failure.In contrast to availability, reliability is defined in terms of a time interval, instead of an instant in time
Safety - the situation that when a system temporarily fails to operate correctly, no catastrophic event happens.
Maintainability - how easily a faulty system can be repaired.

Faults - causes of errors

- Transient faults - occur once and then disappear.
- Intermittent faults - occurs, then vanishes of its own accord, then reappears.
- Permanent fault - one that continues to exist until the faulty component is addressed.

# Redundancy

Having extra components that are activated when a component fails.

1. Information redundancy - extra bits are added to allow recovery from garbled bits.
2. Transaction redundancy - an action is perfomed, and then if needed performed again.
3. Physical redundancy - extra equipment is added to ensure the system tolerates malfunctioning of a component.

# Process resilience

Tolerating a faulty process by organizing several identical processes into a group.

- In particular, having a group of identical processes allows us to mask one or more faulty processes in that group. In other words, we can replicate processes and organize them into a group to replace a single (vulnerable) process with a (fault tolerant) group, either by primary based protocols or replicated write protocols

# Consensus in faulty systems with crash failures.

## Flooding consensus

Typically, a client contacts a group member requesting it to execute a command. Every group member maintains a list of proposed commands, some which it received directly from clients, others which it received from its fellow group members. We can reach consensus by:

    The algorithm operates in rounds, a process P1 sends its list of proposed commands to every other process.At the end of a round, each process merges all received proposed commands into a new list, from which it will select the command to execute. The selection algorithm is the same for all processes, so they will execute the same command. It works as long as processes do not fail.

    If a process fails, a process will decide to move to a next round when it has received a message from every nonfaulty process.

# Reliable client server communication

Fault tolerance not only involves faulty processes, but also communication failures

## Point to point communication

Reliable point to point communication is achieved by using a reliable transport protocol such as TCP

# Reliable group communication

- Involves reliably sending messages to a group of processes.
- Could be solved in multiple ways

  1. When process groups are small, use transport protocols to set up point to point connections to processes.
  2. The sending process assigns a sequence number to each message. It then multicasts and stores each message in a local history buffer until each process returns an acknowledgment. can use multicasting. A receiver can suspect it is missing a message m with sequence number s when it has received messages with sequence numbers higher than s. In that case, it returns a negative acknowledgement to the sender, requesting for a retransmission of m.

- The problem with option 2 is that it is not scalable for multiple receivers. Sending process will be bombarded with man acknowledgements ( feedback implosion). Solution would be to have the receivers send only negative acknowledgments. This would make the sender have to keep messages in the history buffer for longer, but that can be alleviated by assigning an expiration time to each message and deleting once it runs out.

- The key issue to scalable solutions for reliable multicasting is to reduce
  the number of feedback messages that are returned to the sender. A popular
  model that has been applied is feedback suppression. Whenever a receiver notices that it missed a message, it multicasts its feedback to the rest of the group. A receiver R that did not receive message m schedules a feedback message with some random delay. If, in the meantime, another request for retransmission for m reaches R, R will suppress its own
  feedback, knowing that m will be retransmitted shortly. In this way, ideally, only a single feedback message will reach S, which in turn subsequently retransmits m.

# Atomic multicast

Guarantees that a message is delivered to either all non-faulty group members or none.
Virtual synchrony - The principle of virtual synchrony comes from the fact that all multicasts take place between view changes.A view change happens when a process is added or leaves the receiver group or the sender crashes. Put somewhat differently, a view change acts as a barrier across which no multicast can pass. If view change happens when a multicast is in the process, receivers ignore the message.

# Distributed Commit

The distributed commit problem involves having an operation being performed
by each member of a process group, or none at all.

How to solve

a. 2 Phase commit protocol

1. The coordinator sends a vote-request message to all participants.
1. When a participant receives a vote-request message, it returns either a
   vote-commit message to the coordinator, telling the coordinator that it
   is prepared to locally commit its part of the transaction, or otherwise, a
   vote-abort message.
1. The coordinator collects all votes from the participants. If all participants
   have voted to commit the transaction, then so will the coordinator. In that
   case, it sends a global-commit message to all participants. However,
   if one participant had voted to abort the transaction, the coordinator
   will also decide to abort the transaction and multicasts a global-abort
   message.
1. Each participant that voted for a commit waits for the final reaction
   by the coordinator. If a participant receives a global-commit mes-
   sage, it locally commits the transaction. Otherwise, when receiving a
   global-abort message, the transaction is locally aborted as well.

# Recovery

There are 2 forms of recovery

1. Backward recovery - involves bringing the system from its present erronous state back into a previously correct state. To do so it will need to record the systems state from time to time (checkpointing)
   Disadvantages

   - Returning a system to a previous state is usually costly in terms of perfomance.
   - Because backward error recovery mechanisms are independent of
     the distributed application for which they are actually used, no guarantees can be given that once recovery has taken place, the same or similar failure will not happen again.
   - Some states can simply not be rolled back to

- Checkpointing is often combined with message logging for better fault tolerance.

2. Forward recovery - instead of moving back to a previous checkpointed state, an attempt is made to bring it to a new state from which it can continue to execute. The main problem with is that it has to be known in advance which errors may occur.

## Checkpointing

In a fault-tolerant distributed system, backward error recovery requires that
the system regularly saves its state2. In particular, we need to record a
consistent global state, also called a distributed snapshot.

### Coordinated checkpointing

In coordinated checkpointing all processes synchronize to jointly write their
state to local storage.

### Independent checkpointing

Now consider the case in which each process simply records its local state
from time to time in an uncoordinated fashion

## Message logging

The transmission of messages can be replayed, we
can still reach a globally consistent state, but without having to restore that state from local storage. Instead, a checkpointed state is taken as a starting point, and all messages that have been sent since are simply retransmitted and handled accordingly.

# Starting a transaction

Database servers either use an explicit `START TRANSACTION` (Oracle Database ) command or equate every session with a transaction ( MySQL)

# Ending a transaction

Use the `COMMIT` command to end a transaction.

# Transaction Savepoint

Checkpoints within a transaction that allows you to rollback to it without undoing all the work within the transaction.

N/B
Learn how Raft and Paxos works
