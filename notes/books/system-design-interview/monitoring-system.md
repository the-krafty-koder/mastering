# Functional requirements

1. The system being monitored is large scale.
2. A number of metrics are monitored eg CPU usage, request count, memory usage, message count in message queues.

# Non-functional requirements

1. System should be scalable to accommodate growing metrics
2. Low query latency for dashboard and alerts
3. Pipeline should be flexible enough to accommodate new changes in future.

# High level design

System can be divided into 4 main components:

1. Data collection.
2. Data transmission.
3. Data storage
4. Alerting
5. Visualization

# Data model

Metrics data is usually saved as time series that contains a set of values with their associated timestamps.

- The system is under constant heavy write load, while the read load is spiky

# High level Design

                                                      Text
                                                    PageDuty
                                                     Email  <---------  Alert service
                                                  Http endpoint              |
                                                                             |
    Metrics source -> Metrics -> Kafka -> Consumers -> Time series <-  Query service
                      collector                             DB               |
                                                                           Cache
                                                                             |
                                                                        Visualization
                                                                            service

1. Metrics source -> can be application servers, SQL databases, message queues etc.
2. Metrics collector -> gathers metrics data and writes into the time series DB.
3. Time series DB -> stores metrics data as time series DB
4. Query service -> makes it easy to query and retrieve data from the DB.
5. Alerting service -> sends alert notifications to different destinations.
6. Visualization -> shows metrics in form of graphs and charts.

## Metrics collection

1. Pull model

- The collector needs to know about all the services to pull data from. Apache Zookeeper can be used for service discovery. All the services(web, db, cache, queues) register with zookeeper once added. Service discovery contains configuration rules about where to pull data from.
- The collector then fetches info from zookeeper and then pulls metrics data via a predefined http endpoint. To expose the endpoint, a client library usually needs to be added to the service. Data can be aggregated to reduce volume of data sent to the metrics collector.
- At a large scale, it is better to use a pool of collectors. Use consistent hashing to assign a collector to a range of servers identified by name on a hash ring.

Advantages

1. Easy debugging
2. Easier to perform a health check (server is down if not responding to a pull)

3. Push model

A collection agent is installed on every server being monitored. Metrics are then pushed periodically to the metrics collector

Advantages

1. If the metrics collector is set up with a load balancer and an auto-scaling group, it is possible to receive data from anywhere.

Disadvantages

1. Short lived jobs that dont last long enough to be pulled.

- The metrics collector is auto scaled to ensure demand can be handled. To mitigate risk of data loss if time series db is unavailable, use a message queue eg Kafka in between collector and time db. Use Kafka's in built partition mechanism to scale the system eg partitioning by metrics name.

## Query service

Consists of a cluster of query servers which access time series db and handle requests from visualization or alerting systems.

## Cache layer

To make the query service more perfomant, add a cache layer to reduce hits on the db.

## Storage layer

- Optimize space by using data encoding and compression and downsampling (converting high-resolution data to low-resolution to reduce overall disk usage.) to reduce the size of data.
- Also conside cold storing data that is rarely used.

## Alerting system

    Rule config ->  Cache
                      |                                           Email
    Alert store ->  Alert manager -> Kafka -> Alert consumer ->   Text
                      |                                           Page Duty
                  Query service                                   HTTP Endpoint

1. Rules are defined as config files on disk. Load them to cache servers.
2. Alert manager fetches alert configs from the cache.
3. Based on config rules, alert manager queries the service at predefined intervals. If result is beyond threshold, an alert event is created.
4. The alert store is a K,V database that keeps the state of all alerts.
5. Eligible alerts are inserted into Kafka
6. Alert consumers process events from Kafka and send notifications to different channels.
