# Message Queues

A communication method used to handle asynchronous communication between components of a system.

- They act as temporary storage for messages between producers and consumers, allowing the producer to continue with other work.

# Key components

1. Producer
   Create and send messages to the queue
2. Consumer
   Receive and process messages from the queue.
3. Queue
   A data structure that holds messages until they are consumed.
4. Data packets that are sent from the producer to the consumer.
   Usually contain a payload and metadata

# Why use message queues?

1. They enable asynchronous communication - allowing producers to send messages without waiting for consumers to process them.

2. Enable systems to handle varying load more effectively (load balancing ) - if a consumer is busy/offline, messages can be queued until a consumer is ready to process them. When multiple consumers are subscribed to a queue, the messaging system can intelligently route messages to them based on their availability and processing capacity.

3. They enhance fault tolerance by providing features like message persistence, retries and dead-letter queues. This ensures messages are not lost.

4. They enable horizontal scaling by allowing additional instances to be added without impacting operations.

# Common messaging queue patterns

1. Point to point model - a 1:1 messaging pattern where a single producers sends a message to a single consumer via a MQ. Each message is addressed to a single consumer, ensuring only 1 consumer processes the message.
   Advantages

   1. Useful in situations where the system requires guaranteed message delivery.
   2. Commonly used in applications such as task queues, where individual tasks are assigned to specific workers, ensuring efficient workload distribution and processing without interference from other consumers.

2. Producer-Consumer model - a 1:many messaging model where a single producers sends messages to multiple consumers (subscribers) without the

   Advantages.

   1. Usecases include event-driven architectures and real time data distributions.

3. Request-reply
   Useful in situations that require synchronous communication between a client and a server.

# Examples

RabbitMQ
Kafka
Amazon SQS
