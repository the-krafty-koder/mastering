# CAP Theorem

- In a distributed system, one can only have 2 out of 3 guarantees at any given time.

1. Consistency - every read gets the most recent write.
2. Availability - every request gets a non-error response.
3. Partition tolerance - the system continues to operate despite network failures between nodes.

You must choose 2:

1. CP: You fail the request during a partition → drop Availability.
2. AP: You serve stale/inconsistent data during a partition → drop Consistency.
3. CA: You don’t tolerate partitions → drop Partition Tolerance (unrealistic in most distributed systems).

# Consistency models

1. Strong consistency - after a write, all reads reflect that write.
2. Eventual consitency - reads might return stale data, but if no new writes occur, all replicas eventually sync.
3. Causal consistency - Writes that are causally related are seen by all nodes in the same order.
