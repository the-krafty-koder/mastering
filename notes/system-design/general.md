# Considerations for multi-tenant systems

1. Implement data encryption, both at rest and in transit
2. Implement strict access controls so that only authorized users can access specific data sets.
3. Load balancing to distribute traffic.
4. Implement resource quotas to prevent users from hoggingg resources.
5. Use globally unique identifiers as primary keys in database model.
6. Prioritise data isolation via robust filtering mechanisms at database, application and network level.
7. Maintain context about which tenant is making a request eg via middleware injecting tenant info into requests.

# Connection pooling

- A mechanism that allows apps to manage database connections more efficiently by reusing a set of established connection instead of creating one every time a connection is required.

  Potential problems

  1. Choosing the right pool size is critical to avoid bottlenecks or resource exhaustion. Too few can lead to queued requests, while too many can overwhelm DB resources.
  2. Connection leaks when connections are not properly returned to the pool, leading to a gradual exhaustion of available connections. Use a try/finally block to resolve that.
  3. In a microservice environment, use a proxy service eg pgBouncer to implement pooling.
