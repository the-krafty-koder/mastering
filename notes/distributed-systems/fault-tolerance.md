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

Hiding the occurrence of failures from other processes.

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
