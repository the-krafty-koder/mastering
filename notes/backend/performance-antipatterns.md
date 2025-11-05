# Antipatterns

1. Busy database - occurs when database systems run code eg stored procedures and triggers. Processing should be moved from database to application servers.
2. Busy frontend - resource intensive tasks can increase the response times for user requests, they should be offloaded to seperate threads
3. Chatty I/O - numerous I/O requests can slow down the system. Fix it by batching requests and sending them as a single request.
4. Overfetching data - application tries to minimise I/O by fetching all the data it might need. Fixed by selecting only the columns you need from the DB eg by using GraphQL.
5. Improper instantiation - caused by constantly instantiating a class that brokers a resource. Fixed by using a singleton instance of the class.
6. Monolithic persistence - traditionally all data was stored in a single data store which caused performance problems as 1 store may not be the best fit for all the data. Solved by using different data stores for each data set.
7. No caching - use caching
8. Noisy neighbor - happens in multitenant systems where one tenant consumes more resources than others. Fix by service throttling, monitoring usage and allowing tenants to purchase reserved capacity.
9. Frequent retries - occurs when service is slow/down and client retries multiple times, worsening the situations. Fix by exponential backoff with jitter.
10. Synchronous I/O - blocking the calling thread while I/O completes can reduce perfomance. Use asynchronous operations eg the asynchronous versions of libraries.
