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
   # Power of 2 choices
   - A variation of randomized LB where 2 servers are picked randomly, both are asked amount of load they have and request sent to least load
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

# Layer 7 vs Layer 4 load balancing

- Layer 4 operates at the transport layer(responsible for end-to-end communication) of the OSI.
- Layer 4 load balancers make routing decisions based on network level information (IP, port) without looking at actual data packets. This makes them fast and efficient for basic routing but poor for when you want more nuanced routing decisions.
- Layer 7 operates at the application layer and makes routing decisions based on the content of data packets, HTTP headers, URLS and cookies.

# When to use Layer 4

- When optimal performance is required.
- When simplicity is key since it uses less complex algorithms and computational power.
- Cost as layer 4 hardware is cheaper.

# When to use Layer 7

- When there is need to make intelligent load balancing decisions.
- When content-based routing is required eg via message payload or headers.
- When session persistence is required.

# Static Content Hosting

- Deploy static content eg HTML Pages, images etc to a cloud storage service to reduce the need for computationally intensive compute instances.

  Considerations

  1.  Hosted storage service must expose an API endpoint users can access to download static content.
  2.  For maximum performance, consider using a CDN that caches content in multiple data centers.
  3.  You may have to perform seperate deployments if some content is on server and some on storage service. If only static resources have to be updated, they can simply be uploaded to the storage account without needing to redeploy the application package.
  4.  Configure storage servers for public read access but not public write access.

  When to use this pattern

  1. Minimise the hosting cost for apps that contain static resources / only have static resources
  2. Exposing static resources for applications running in other hosting environments.
  3. Using a CDN adds a cache layer and improves perfomance and reliability.

  When not to use it.

  1. Application needs to perform some processing on content eg add timestamps
  2. The volume of the static content is very small.
