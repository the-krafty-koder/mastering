# Message Queues

A communication method used to handle asynchronous communication between components of a system.

- They act as temporary storage for messages between producers and consumers, allowing the producer to continue with other work, while the consumer executes.
- Useful for the asynchronous processing of large requests

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

# AMQP (Advanced Message Queueing Protocol)

RabbitMQ implements this protocol.

A messaging protocol that enables conforming client applications to communicate with conforming messaging middleware brokers.

                           Message Broker
                     _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

      Publisher -> | Exchange -> Binding -> Queue | -> Subscriber
                     _ _ _ _ _ _ _ _ _ _ _ _ _ _ _


      Broker consists of:

         1. Queue - the data structure responsible for storing the messages consumed. A queue can be any of:
            Durable - automatically recreated if the broker restarts.
            Exclusive - queue is bound to only one particular subscriber connection.
            Auto-delete - queue will be deleted when last subscriber disconnects.

         2. Exchange - this is where a message is published.  An exchange routes the
         messages to one or more queues depending on the algorithm it implements:
            Direct exchange: It routes the messages by matching an entire
                           routing  key (for example, chat.msg)
            Topic exchange: It distributes the messages using a glob-like pattern
                           matched against the routing key (for example, chat.# matches all the routing keys starting with chat.)
            Fanout exchange: It broadcasts a message to all the connected
                           queues, ignoring any routing key provided

         3. Binding: This is the link between exchanges and queues. It also defines the routing key or the pattern used to filter the messages that arrive from the exchange.

      Consumer
      They obtain messages from the broker. are two ways for applications to do this:

         Subscribe to have messages delivered to them ("push API"): this is the recommended option
         Polling ("pull API"): this way is highly inefficient and should be avoided in most cases.
