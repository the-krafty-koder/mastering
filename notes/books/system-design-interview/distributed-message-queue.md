# Functional requirements

1. Producers send messages to a message queue.
2. Consumers consume messages from a queue.
3. Messages can be consumed repeatedly or only once.
4. Historical data can be truncated
5. Message size is in the kilobyte range.
6. Ability to deliver messages in the same order they were added.
7. Data delivery semantics (at-most-once, at-least-once) can be configured by the users.

# Non functional requirements

1. High throughput and low latency
2. Scalable
3. Persistent and durable.

# High level design

                            ZOOKEEPER
                Metadata     State      Coordination
                storage      storage       service
                                >
                                |
                                |
                                |
                                <
    Producer ----> Message Queue(Data storage) <--> Consumer(consumer groups)

# Messaging models

Point-to-point -> a message is sent to queue and consumed by only one consumer. Once the consumer acknowledges that a message is consumed, it is removed from the queue.
Publish-subscrive -> messages are sent to and read from a topic. Consumers subscribed to the topic receive the messages.

# Topics, partitions and brokers

We divide a topic into partitions and deliver messages evenly across partitions. Partitions are small subsets of messages held by a MQ. Partitions are distributed evenly across servers called brokers.

- When a consumer subscribes to a topic, it pulls data from a partition. When there are multiple consumers subscribing to a topic, each consumer is responsible for a subset of the partitions for the topic. The consumers form a consumer group for the topic.

# Deep dive

1.  Data storage
    Store messages in a write ahead log stored on disk.WAL is just a plain file where new entries are appended to an append-only log. Databases are not ideal because it is hard to design a db that supports both write and read-heavy data access at scale - which is needed here.

2.  Message data structure

    Field Data type
    key byte
    value byte
    topic string
    partition integer
    offset long
    timestamp long
    size integer
    crc integer

3.  Batching
    We batch messages in the producer, consumer and the message queue itself.
4.  Producer Flow
    Add a routing layer as part of a producer so the producer knows which broker to send a topic to. Add a buffer component as well to batch messages. Producer then sends messages to the broker.
5.  Consumer flow
    Consumer specifies its offset in a partition and receives back a chunk of events beginning from that position.

    - Should brokers push to consumers or consumers pull data from the broker?

    1. Push model
       Adv. - low latency
       Disadv - if rate of consumption falls below rate of production, consumers can be overwhelmed (backpressure). Also, it is difficult to deal with consumers of different processing power because the brokers control the rate at which data is transferred.

       How to solve for backpressure

       1. Rate limit producers. Also send acknowledgements before next batch is sent.
       2. Scale out consumers by adding more instances.
       3. Use buffers to absorb spikes

    2. Pull model
       Adv - consumers control the rate of consumption. Also, if rate of consumption falls below rate of production, consumers can be scaled.Also more suitable for batch processing.

       Disadv - when there is no message in the buffer, consumers might still keep consuming data.

6.  State storage
    Stores the mapping between partitions and consumers and the last consumed offsets for each partition.
7.  Metadata storage
    Stores the configuration and properties of topics.

# Data delivery semantics

1. At most once - messages will be delivered not more than once. Messages may be lost but are not redelivered. Suitable where a small amount of data loss is acceptable eg monitoring systems.
2. At least once - it is acceptable to deliver a message more than once but no message should be lost. Good for use cases where data duplication is not a big issue
3. Exactly once - important when duplication is not acceptable eg payments.
