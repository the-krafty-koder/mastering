# Rate limiting

A technique that allows a service to control the consumption of resources used by an instance of an application, an individual tenant or an entire service.

# Why do applications rate limit

1. Protection against distributed denial of service attacks.
2. Server stability and consistency - prevent a single client from overwhelming resources and making other users have a poor experience
3. Cost control if more requests cost more money.

# Rate limiting techniques

1. Fixed window counter - clients are allowed a specific number of requests within a time window. Each request increments counter by one. Once counter reaches the threshold, requests are dropped until a new time window starts.

   Advantages
   Simple and easy to implement
   Allow burst request as long as threshold is not exceeded.
   Memory efficient

   Disadvantages
   Requests can exceed threshold at window boundaries.
   If you deplete your requests early, you wont be able to make any more requests.

   Applications
   API Rate limiting

2. Sliding window log - like fixed window, but with each request the system logs and checks the timestamp against the number of accepted requests in recent window. If request falls within the threshold it is served, otherwise rejected.

   Advantages
   Fine grained traffic control - with no boundary issue.

   Disadvantages
   Increased complexity - system must maintain a log

3. Sliding window counter - divide the time period into smaller units. Each time a request comes in, the system:Records it in the current time slot (e.g. a counter for 12:00:27).Looks back over the last N seconds (e.g. the last 60 seconds) and adds up all requests from each second in that window.If the total exceeds the limit, the request is denied; otherwise, it proceeds.

   Advantages
   More precise at window boundaries

   Disadvantages
   More complex to implement

4. Token bucket - works by using a conceptual bucket that holds tokens. Tokens are added to the bucket at a predefined rate.The bucket also has maximum capacity, if tokens arrive when the bucket is full, tokens are simply discarded. Every request consumes a token, if there are none, the request is delayed until tokens become available or rejected.

   Advantages
   Allows for short bursts of traffic (when tokens are available)
   Useful for systems that experience irregular traffic patterns.
   The algorithm is easy to implement.
   Memory efficient.

   Disadvantages

   - It doesnt guarantee a smooth request rate.
   - Memory consumption issue ( creating token buckets for each user increase as users increase )
   - Tuning parameters like bucket capacity and token generation rate can be complex.

   Applications

   - Widely used for API rate limiting.

5. Leaky bucket algorithm - system accepts incoming requests and places them in a queue. Requests are then processed at a fixed rate. If too many requests arrive and the bucket is full, extra requests are discarded.

   Advantages
   Simple to implement
   Allows for stable traffic control
   Memory efficient given the limited queue size.

   Disadvantages
   Lacks flexibility in handling traffic spikes

   Uses
   Useful in scenarios where stable traffic handling is required.

   Applications

   - Used in network bandwidth management to limit data transfer rates.
   - Used in video streaming to ensure smooth data transmission.
   - Used in server request handling to maintain steady processing rate and prevent overload.

# Implications of rate limiting

    # Server
    - Use IP address, client name or API Key for identity.
    - Determine the traffic breaking point, so as not to give clients too much volume. ( Do a load test)
    - Preferrably use a library

    # Client
    1. There is need to use retry policies
        1. Exponential backoff - wait a period of time before retrying, increase the time period by a factor of two with every retry.
        2. Exponential backoff with jitter -  add randomness to exponential backoff to prevent clients from retrying at the same time.

        Good to have a retry limit (3-5)
     2. Use client cache to avoid frequent API calls.
     3. Understand the limit and do not send many requests in a short time.
     4. Include code to catch exceptions so clients can gracefully exit.
     5. There is need to be fault tolerant
