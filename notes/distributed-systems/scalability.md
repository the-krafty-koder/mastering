# 3 dimensions of scalability

Cloning - cloning the same instance of an app n times and having each handle 1/nth of the load.
Decomposing - Split an application by its functionalities, creating standalone applications each with its own codebase, possibly dedicated database and even seperate UI.
Data partitioning - splitting an app such that each instance is only responsible for its own partition of the data. Normally handled at the data storage level.

# Cluster module

Used to distribute the load of an application across different instances.

# Definitions

Redundant - duplication of components to provide backups in case of failure

    - How its achieved
    1. Database replicas
    2. Multiple data centres
    3. Extra servers

Fault tolerance - the ability of a system to keep functioning correctly even when some of its components fail.

    - How its achieved
    1. Retries (exponential backoff, exponential backoff with jitter)
    2. Failover ( active-active, active-passive)
    3. Replication (master-slave, master-master)
    4, Graceful shutdown (ensuring functionality that was being executed ends before exiting the system)

Resilience - the ability of a system to recover from failure and return to a healthy state.

    How its achieved
    1. Fault tolerance
    2. Monitoring
    3. Self-healing ( restarts )
    4. Fallback strategies

N/B
Fault tolerance = surviving a punch
Resilience = recovering from a punch

Zero-downtime restart - the code of an application is updated without affecting its availability. Implemented by using a load balancer with mulitple instances. Update code in 1 instance and when that instance is ready and healthy, route traffic to that instance and kill off old instance.

# Handling shared state across multiple instances

In a round robin load balancing algorithm, if a load balancer sends a request to server A, user is authenticated. If a subsequent request is sent to server B, authentication state is lost. How to solve this.

1. Shared data store accessible by multiple instances.
   Use a store like postgres or redis to save application state. Store will be accessible by all instances.

2. Sticky load balancing
   Routing all requests associated with a session to the same instance of an application.

   - Use a session id attached to a request via a cookie to identify clients and map session ids to app instances.

   - Alternatively use an IP adress to identify clients. IP address is hashed to a value representing server instance. The request is then routed to that server instance.

     Advantages of using IP hashing
     It doesnt require the mapping to be remembered by the load balancer

Sticky load balancing nullifies the redundant advantages of having a persistent shared store i.e where an instance can eventually replace another one that stopped working . It is recommended to avoid sticky load balancing and use a shared store.

# Scaling with a reverse proxy

Reverse proxy sits between a client and a server, it is used to forward requests from client to server.

Client -> Internet -> Reverse proxy -> Server

Uses

- Hides internal network ip adresses and provide as single IP for clients to use.
- Improved security, can be used to deny requests from certain clients. (DDOS attacks)
- Caching static assets
- Load balancing
- SSL termination ( decrypting HTTPS (SSL/TLS) traffic at the edge of your network )

# Choosing reverse proxy instead of cluster module in Node.js

It is the more traditional approach, they offer more control in highly available production environments.

- A reverse proxy can distribute traffic across several machines not just processes.
- Most reverse proxies support sticky load balancing out of the box.
- Availability of more powerful load balancing techniques.
-

# Container orchestration

Used to manage all container instances over the available machines within a cloud cluster, eg Kubernetes

    ## Responsibilities
    1. Allows us to join multiple cloud nodes into a single cluster.
    2. It makes sure there is no downtime. If a container instance stops or becomes unresponsive, it will be restarted.
    3. Provides functionalities to support service discovery or load balancing
    4. Provides orchestrated access to durable storage so that data can be persisted as needed.
    5. Automatic rollouts and rollbacks of apps with zero downtime (zero downtime restarts)
    6. Provides secrets storage for sensitive data.

# Decomposition

Splitting a large application by service or functionality. Operates on the Y axis, scalability is on the X axis
