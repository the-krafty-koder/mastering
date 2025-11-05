# Database isolation

- They allow transactions to execute as if there are no other concurrently running transactions.

# Isolation levels

1. Serializable - concurrent transactions are guaranteed to be executed in sequence.
2. Repeatable read - data read during the transaction stays the same as when transaction started.
3. Read committed - data modification can only be read after the transaction is committed.
4. Read uncommitted - data modification can be read by any other transaction before the transaction is committed.

The isolation is guaranteed by Multi-Version Consistency Control and locks.
