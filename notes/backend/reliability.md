# Architectural patterns that support reliability.

1. Backend for frontend

- Provides backend service for specific frontend interfaces so that if one service is down, others are not impacted.

2. Bulkhead

- A failure isolation strategy used to contain faults by introducing segmentation between components.

3. Cache-aside

- Optimizes access to frequently read data by introducing a cache that's populated on demand.

4. Circuit breaker

- Prevents continuous requests to a malfunctioning service or dependency.

5. Compensating transactions

- Provides a mechanism to recover from failures by reversing the effects of previosuly applied actions.

6. Competing consumers

- Applies distributed and concurrent processing to efficiently handling items in a queue. Multiple consumers read from the same message queue but each message is only processed by one of them.

7. Event sourcing

- Tracking state changes as a series of events that can be relpayed.

8. Federated identity.

- Delegates trust to an external identity provider to manage authentication. Offloading shifts reliability responsibility to provider, which usually has high SLAs.

9. Gateway aggregation

- Aggregates calls to multiple backend services. Fault handling can then be done in one place instead of multiple.

10. Gateway routing

- Routes requests to various backend services. Promotes reliability by routing traffic to only healthy nodes.

11. Health endpoint monitoring

- Can be used as a signal for self-healing remediation incase service fails.

12. Leader election

- Establishes a leader in a distributed system, managing malfunctions by redirecting work.

13. Message Queues (Pub-Sub)

- Decouples architectural components via a broker.

14. Rate-limiting

- Protects clients by acknowledging limitations when a service is designed to avoid reaching specified limits. Controls client requests by reducing throttling errors.

15. Retry

- Addresses transient failures

16. Sharding

- Directs load to a specific shard to handle requests. Malfunction in one shard doesnt affect others.

# Architectural patterns that support availability.

1. Health endpoint monitoring

- Can be used as a signal for self-healing remediation incase service fails.

2. Throttling

- You can design limits to prevent resource exhaustion resulting from automated abuse.

3. Queue-based load levelling

- Control level of incoming tasks by buffering them in a queue and processing at a controlled pace.

4. Geode

- Deploy systems that operate in an active-active mode across multiple geographies

5. Bulkhead

- A failure isolation strategy used to contain faults by introducing segmentation between components.

6. Circuit breaker

- Prevents continuous requests to a malfunctioning service or dependency.
