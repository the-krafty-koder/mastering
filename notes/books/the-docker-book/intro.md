# Docker

An open source engine that automates the deployment of applications into containers.

Advantages

1. Easy and lightweight - you can dockerize an application in minutes.
2. Segregation of duties - developers care about applications running in containers while operations care about managing the containers.
3. Fast and efficient development life cycle - reduces the cycle time between code being written and code being executed.
4. Encourages service oriented and microservice architecture.

# Docker components

1. Docker client and server (Docker engine)
2. Docker images - blueprint of an execution environment containing app code + dependencies
3. Docker registries - private and public registries that list and store docker images.
4. Docker containers - running instance of an image.

N/B
Docker compose - allows you to run stacks of containers to represent application stacks, eg web server, app server and db server.
Docker swarm - allows you to create clusters of containers, called swarms to run scalable workloads.

Difference

- Docker compose is for running multiple containers on a single host. Used for local development or simple single-host deployments.
- Docker swarm is an orchestration tool for turning multiple hosts into a single cluster

# Docker uses

1. Making local development workflow faster.
2. Running standalone services and apps consistently.
3. Using docker to create isolated instances to run tests eg CI.
4. Building a multi user platform as a service.
5. Providing sandbox environments for learning and teaching eg Unix.
