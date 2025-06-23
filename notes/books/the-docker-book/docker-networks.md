# Docker Networking

Allows you to setup your own network through which containers can communicate.

`docker network create <network_name>`
`docker network inspect <network_name>` - check for info about a network
`docker network rm <network_name>` - remove a network

# Running a container inside a network

`docker run -d --net=app --name db jamtur01/redis --protected-mode no`

# Add a container to an existing network

`sudo docker network connect app db2`

# Disconnecting a host from a network

`sudo docker network disconnect app db2`
