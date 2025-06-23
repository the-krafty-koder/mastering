`docker info` - returns a list of containers, images, execution and storage drivers and basic configuration docker uses.
`docker run` - used to create a container.
`docker run -it ubuntu /bin/bash` - i flag keeps STDIN open from the container, even if were not attached to it. The -t flag provides us with an interactive shell in the container.
`docker ps -a ` - used to show a list of current containers.

- Docker will automatically create a name for each container we create.

`docker run --name bob_cat -it ubuntu /bin/bash` - use the --name flag to set a name.
`docker rm` - used to remove a container
`docker start/restart <container_name/container_id>` - used to restart a stopped container.
`docker attach <container_name>` - used to attach to an interactive session after restarting a stopped container.
`docker run --name daemon_dave -d ubuntu /bin/sh` - use the -d flag to create a detached container running in the background.
`docker logs <container_name/id>` - fetches the logs of a container.
`docker top <container_name/id>` - used to check processes running inside a container.
`docker run --restart=always ubuntu /bin/bash` - used --restart flag to automatically restart containers when they stop because of a failure.
`docker inspect <container_id>` used to get more info about the container.
