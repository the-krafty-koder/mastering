# Nearby Friends

The mobile client presents a list of friends who are geographically nearby

# Functional requirements

1. Users should be able to see nearby friends on their mobile apps.
2. Nearby friend list should be upated every few seconds.

# Non functional requirements

1. Low latency
2. Reliability
3. Eventual consistency

# High level design

                             Client
                               |
                          Load balancer
                               |
                               |
                      ------------------------
                     |                        |
             -----> Web socket             API Servers
            |       server                    |
            |         |                       |
            |         | ------------------> User DB
            |         |
            |         |
            |          ----------------------
            |         |          |          |
             <----Redis         Location   Location
                Pub/Sub         cache       history
                                            db

1. Websocket servers - handle real time update of friend's locations
2. Location cache - stores the most recent location data for each active user. A TTL expiry is set on each entry in the cache.
3. User DB - stores user and friendship data.
4. Location history - stores users location history data.
5. Redis Pub/Sub - every update is sent to a user's own channel (topic). A dedicated WebSocket connection handler for each active friend subscribes to the channel. When there is an update, the handler is invoked and the distance is recomputed.If new value is within distance, updates are sent to a friend's client.

# Design deep dive

## Scaling

1. API Servers - replication
2. Websocket servers - can be auto-scaled depending on usage. These servers are stateful, so care must be exercised when removing existing nodes. Apply graceful shutdown before removing an existing node in a server clusters. It is worth noting that effective auto-scaling of stateful servers is the job of a good load
   balancer. Most cloud load balancers handle this job very well.
3. User DB - shard based on user id
4. Redis cache - shard location data based on ID.
5. Redis Pub/Sub - use a distributed Redis Pub/Sub server cluster. Shard the channels based on the publisher's user ID. Use consistent hashing to determine the pub-sub server to talk to for each channel.
