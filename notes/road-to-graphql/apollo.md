# Apollo

It is an open source platform for building and managing GRAPHQL APIs.

# Apollo advantages

1. Has a large ecosystem offering solutions for many of GQL challenges
2. Up to date documentation.
3. Offers plenty of libraries for GQL
4. Interoperability with other frameworks eg Apollo Client with React
5. Can be used to manage remote data, while local data uses Redux/Mobx

# Apollo Disadvantages

1. Still in its early stages.
2. Missing competition.

# Apollo alternatives

Relay - GraphQL client library for JS
AWS Amplify - GraphQL Client⁵⁶: The AWS Amplify family offers libraries for cloud-enabled applications. One of the modules is a GraphQL client used for general GraphQL servers or AWS AppSync APIs.
urlq - GraphQL client library

For node:

1. Express-graphql
2. Graphql-yoga

# Shortcomings of GraphQL without Apollo

Using raw HTTP (e.g., with Axios) to access GraphQL APIs in React exposes several limitations compared to using a dedicated client like Apollo:

Poor Fit for GraphQL: Axios and similar HTTP libraries don't align well with GraphQL's structure. GraphQL typically uses a single endpoint and POST method, making traditional RESTful patterns unnecessary.

Imperative vs Declarative: Plain HTTP requests require manual, imperative calls. A GraphQL client like Apollo enables a declarative style, co-locating queries with React components and simplifying data-fetching logic.

Lack of Feature Support: Without a client library, you must manually manage multiple queries, aggregate results, and track state — adding significant complexity.

Cumbersome Data Handling: There's no built-in normalization or caching. Managing nested state and updates is verbose and error-prone without tools like normalizr.

Missing Advanced Features: Functionality like pagination, optimistic updates, and caching are absent when using raw HTTP without a library.

No Built-in Subscription Support: GraphQL subscriptions require setting up WebSockets manually. Dedicated clients abstract this complexity and handle real-time data seamlessly.
