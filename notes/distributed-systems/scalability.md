# 3 dimensions of scalability

Cloning - cloning the same instance of an app n times and having each handle 1/nth of the load.
Decomposing - Split an application by its functionalities, creating standalone applications each with its own codebase, possibly dedicated database and even seperate UI.
Data partitioning - splitting an app such that each instance is only responsible for its own partition of the data. Normally handled at the data storage level.

# Cluster module

Used to distribute the load of an application across different instances.

# Definitions

Redundant - if one instance goes down for whatever reason, theres still other instances to serve requests.
Resilience - the ability to maintain a certain level of service, even in the presence of malfunctions or crashes.

Zero-downtime restart - the code of an applicated is updated without affecting its availability.
