# Load balancers

They distribute incoming traffic to computing resources (databases, servers)

Advantages

1. Prevents requests from going to unhealthy servers.
2. Prevents overloading resources.
3. Helps to eliminate a single point of failure.
4. Helps with SSL termination - decrypt incoming requests and encrypt responses from servers.
5. Session persistence - route client requests to same instance of web servers.

# Load balancing algorithms

1. Random - requests are sent to random app servers
2. Round robin - requests are sent in a rotational manner.
3. IP Hashing - distribute requests based on hash of a client's IP
4. Sticky sessions - maintain a mapping of the session ids to server ip and use to distribute.
5. Least connections - assigns new requests to the server with the fewest active connections
6. Least load - distributes incoming requests based on the current resource availability of each server, such as CPU usage, memory, or network bandwidth

# Reverse proxy

Forwards requests from client to servers. It centralizes internal services and provides unified interfaces to the public.

# Advantages

1. Increased security - hides information about backend servers, blacklist IPs and limit number of connections per client.
2. Increased flexibility - clients only see a single IP, so you can scale servers however you want.
3. Can be used for SSL termination
4. Can serve static content directly
5. Compression and caching - can compress server responses and return responses for cached requests.

# Load balancer vs reverse proxy

- Deploying a load balancer is useful when you have multiple servers. Often, load balancers route traffic to a set of servers serving the same function.
- Reverse proxies can be useful even with just one web server or application server, opening up the benefits described in the previous section.
