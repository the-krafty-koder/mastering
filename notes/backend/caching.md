# Caching

The process of storing copies of data in a high speed storage layer to reduce the time it takes to access this data vs fetching it from a primary storage ( database )

# Advantages of caching

1. Enhances system reliability by reducing dependence on the primary data source.
2. Improves system availability by serving data from the closest or least busy location.
3. It is crucial for handling increased traffic and reducing load on backend servers.
4. Results in fewer reads/writes to the databasse hence improving perfomance.

## Caching mechanisms

### Client side caching

Storing frequently accessed static resources (HTLM, CSS, JS, Images) on the client device, typically browser memory or local storage.

### CDN Caching

Storing static assets on ditributed servers that can be easily accessed across geographical regions.

### Web server caching

Implemented on the web server for frequently accessed content. If content is in cache, just serve, no need to regenerate it. It is effective for static pages, dynamic content with long expiration times or content that is expensive to generate.

### Application caching

Prevents the need for repeated data retrieval from the database. Data is cached within application memory or in memory data stores.

### Database caching

Focuses on improvement of database operations by caching frequently accessed data or query results.

    1. Query level caching - stores the results of frequently accessed queries in memory

    2. Object level caching - caches individual data objects or records retrieved from the database.

### Load balancer caching

Involves storing frequently accessed content eg static assets (HTML, CSS, JS) on the load balancer itself, thereby reducing the requests that reach the server

## Cache eviction

Process by which old or unused data is dropped from the cache.

### First In First Out

Removes the oldest data from the cache.It can lead to premature eviction of items that are still in demand.

### Last In First Out

The most recently inserted data is the first one to be evicted.It does not consider access patterns and can lead to poor eviction choices.

### Least Recently Used

Removes the least recently accessed data item from the cache. Assumes that the item is unlikely to be accessed again soon. Requires tracking access timestamps for each item, making it slightly more expensive to implement.

### Most recently used

Evicts the most recently accessed data from the cache. Assumes the most recently accessed data is unlikely to be accessed again. Effective when a small subset of items is frequently used and older items are more likely to be reused.

### Least frequently used

LFU evicts the least frequently accessed data item from the cache. It assumes that items with lower access frequency are less likely to be accessed in the future. LFU requires maintaining access frequency counts for each item, which can be memory intensive.

## Cache invalidation ( Read more on this)

Ensures cached data remains consistent with the underlying data source.

### Active invalidation

Removing cached data when underlying data source changes. Requires the system to initiate invalidation operations.

### Sending updates

The server simply sends updates to the cache whenever underlying data changes.

### Time to live

Associates a time to live with each data item. When the time expires, the item ceases to be valid.

## Caching strategies

### Cache aside

When data is requested, application first checks the cache. If cache miss, data is retrieved from datastore, saved in the cache, then sent to client. The application code manages the cache here.

### Read through

Cache management is left for the cache itself. On request, if data is available it is returned, else the cache itself fetches the data from source and stores it in cache for future use, before returning the data to client.

### Write through

Data is written to both the cache and the underlying data source simultaneously. Data is first written to the cache then propagated to the data source before the write operation is considered complete

### Write around

Involves bypassing the cache and writing directly to the underlying data source. Reads are from cache, if cache miss then data is fetched from db and populated in cache. Avoids polluting the cache with rarely used data.

### Write back

Write operations are perfomed directly on the cache. Data is updated to db at a later time. we delay the propagation of updates by allowing multiple writes to take place before informing the servers. The update is eventually propagated to the data source asynchronously on a schedule or when specific conditions are met (e.g., cache eviction or time intervals)

### Refresh ahead

Proactively retrieves data from the source before it is requested. Cache anticipates the need for future events before it is retrieved.
