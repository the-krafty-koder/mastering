# GraphQL

An open source query language. It allows request for specific data, giving clients more control over what is sent. In REST, the backend controls which data is available for which resource via a url.

- A GQL operation is either a query, mutation or subscription

# Advantages

1. Declarative data fetching -> the client selects data along with its entities with fields across relationships in one request. For example an author with articles in a 1: many r/ship. In REST it would require to fetch request to obtain both but in GQL only 1 request is required.

2. Prevents overfetching -> GraphQL prevents overfetching by allowing clients to request only the specific damnecessary data. This optimizes data usage, especially for mobile apps.

3. Framework agnostic -> Can be used across a variety of JS frameworks.

4. Single source of truth -> GraphQL schema is usually the single source of truth.It provides a central location where all available data is described.Schema is defined on server side but clients can read(query) and write(mutate) data based on the shema.

5. Allows schema stitching -> You can create one schema out of multiple schemas
6. GQL Introspection -> You can retrieve the GQL schema from a GQL API. Since the schema has all the information about data available through the GraphQL API, it is perfect for autogenerating API documentation.
7. Strongly typed GQL - it is strongly typed using the GQL schema definition language making it less error prone.

# Disadvantages

1. Complex queries - perfomance problems arise when a client requests too many nested queries at once.

2. Rate limiting - Unlike REST, it is difficult to implement rate limiting for individual GQL operations.

3. Difficult caching - Unlike REST, since different data can be requested for the same resource, you have to implement caching at the field level - which is non-trivial.Most libraries offer caching though.

# Why not REST?

It is useful for instances where you need to fetch related data in a single request. Eg in the article example above - one request for the author entity and related articles, unlike REST which would require 2. It is also declarative allowing to fetch only required data.
