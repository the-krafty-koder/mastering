# Docker swarm

Is native clustering for docker. Turns a pool of docker hosts into a single virtual docker host.
It ships with tooling and backend integration
-For simple use cases and provides an API for integration with more complex tools
and use cases.

- A swarm is made up of worker and manager nodes. Managers do the dispatching and organizing of work on the swarm,
  and cluster management functionality that keeps the swarm active and healthy.
- Worker nodes run the tasks ( a unit of work ) dispatched from manager nodes.
- Services are are a container image and commands that will be executed on our swarm
  nodes.
- The swarm also manages load balancing and DNS much like a docker host.
- A swarm cluster in Docker refers to a group of Docker hosts (physical or virtual machines)
  that have been configured to work together as a single, unified system using
  Docker's built-in "Swarm mode."

`docker swarm init --advertise-addr $PUBLIC_IP` - used to initialize a swarm with a manager.
`docker swarm join --token <token> <manager_ip>` - used to join a swarm from a worker node
`docker node ls` list all the nodes in a swarm
`docker service create --replicas 2 --name heyworld \
    ubuntu /bin/sh -c "while true; do echo hey world; sleep 1; done"` - used to create a service
on a swarm
`docker service ls` - list the services
`docker service ps` - lists each task and the node it is running on.
`docker scale <service_name>=3` - used to scale replicas
