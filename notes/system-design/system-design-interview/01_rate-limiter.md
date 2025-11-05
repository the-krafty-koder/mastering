# Rate limiter

Used to control the rate of traffic sent by a client or service.

# Functional requirements

1. Accurately limit excessive requests.
2. Should show clear exceptions to users when they are rate limited.

# Non functional requirements

1. Low latency
2. Use as little memory as possible.
3. Distributed rate limiting
4. High fault tolerance

# Algorithms

Visit rate limiting doc to view

# High level design

                                                          Rules
                                                            |
                                ---------> Cache <------- Workers
                               |
                               |
    Client ------> Rate limiter middleware ------> API Servers
                               |
                               |
                               |
                                -------> Redis cache
                               |
                               |
                                -------> Message Queue (if we need to process later)

- Use in memory data store because of its speed and support for time-based expiration.

1. Rules are stored on the disk. Workers frequently pull rules from the disk and store them in the cache.
2. Rate limiter middleware loads rules from the cache. It fetches counters and last request timestamp from Redis cache
3. Client sends a request to rate limiting middleware
4. Middleware fetches counter from corresponding bucket in Redis.
5. Checks if limit is reached or not. If reached request is rejected else it is forwarded to APIs and the counter is incremented.

# Deep dive

1. Exceeding the rate limit.

   - If a request is limited, return a HTTP 429 response ( too many requests). One may enqueue the rate limited requests to be processed later.
   - Rate limit headers are sent back to the client.

   1. X-Ratelimit-Remaining: The remaining number of allowed requests within the window.
   2. X-Ratelimit-Limit: It indicates how many calls the client can make per time window.
   3. X-Ratelimit-Retry-After: The number of seconds to wait until you can make a request again without being throttled.

   - When a user has sent too many requests, a 429 too many requests error and X-Ratelimit-Retry-After header are returned to the client.

2. Rate limiting in a distributed environment

- 2 challenges,

  Race condition

  - Can happen when 2 requests concurrently read the counter value before each of them write the value back. Locks can be used but will slow down the system. Lua scripts and sorted sets in Redis can be used to solve

  Synchronization issue

  - When multiple rate limit servers are used, synchronization becomes a problem. Solution is to use a centralised store

3. Perfomance optimization

- Use a multi data center setup to reduce latency. Also synchronize data with an eventual consistency model.
