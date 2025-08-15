- A docker image is made up of filesystems layered on top of each other.
- Docker Images - Summary Notes:
- Docker Image Structure: Made of multiple layered filesystems.
- Boot Layer (bootfs): Base layer, similar to Linux/Unix boot filesystem. Not directly used by Docker users and unmounted after boot to free memory.
- Root Filesystem (rootfs): Sits on top of bootfs; can be an OS like Ubuntu or Debian.
- Read-Only Layers: In Docker, rootfs remains read-only. Additional read-only layers are added using a union mount.
- Union Mount: Combines multiple read-only filesystems into one unified view.
- Image Layers:
  Parent image: Higher layers.
  Base image: Bottom-most layer.
- Writable Layer: When a container starts, a read-write layer is added on top where actual processes run.

`docker images` - used to list images
`docker pull <image_name>:<tag>` to pull images from docker registry.
`docker search <name>` - used to search images on the docker hub

# Dockerfile

- Used alongside `docker build` to build images.

```
FROM ubuntu:18.04
LABEL maintainer='omondio254@gmail.com'
RUN apt-get update; apt-get install -y nginx
RUN echo "Hi, i am in your container" \
    >/var/www/html/index.html
EXPOSE 80
```

- FROM -> specifies the image that the subsequent instructions will run in. (Must always be the first instruction)
- LABEL -> specifies the author of the image.
- RUN -> executes commands on the current image.By default the run command executes inside a shell. Use the `exec` command if you want to run outside of a shell.
- EXPOSE -> tells Docker that the application on this container will use the specific port on that container. It doesnt mean you can automatically access whatever is running on that port, that will be set as part of a flag in a `docker run` command. It can also be used to link together containers.
- ENV -> sets the environment variables in the image.

# Docker build cache

Use the `--no-cache` flag as part of the build command if you dont wish Docker to use cached layers.

Use `docker history <imageid>` to drill into how an image was created.
`docker run -p 8080:80 <image_id>` - used to bind port 80 on the container to port 8080 on the docker host (localhost in this case)
`docker run -d -p 127.0.0.1:80:80 <image_id>` - you can also bind an interface to a port on the container(127.0.0.1)

# Dockerfile Instructions

## CMD

- Specifies the command to run when the container is launched. Similar to `RUN`, but instead of running a command when the container is being built, it runs the command when container is launched. You can only specify one CMD instruction per Dockerfile

`CMD ["bin/bash", "-l]`

## ENTRYPOINT

- Similar to the `CMD` command but it cant be easily overriden by the `docker run` command like CMD

`ENTRYPOINT ["/usr/sbin/nginx"]`

## WORKDIR

- Provides a way to set the working directory of the container and the ENTRYPOINT or CMD to be executed when a container is launched.

`WORKDIR /opt/webapp/db`

## ENV

- Used to set environment variables during the image build process. You can specify single or double env variables.

`ENV RVM_PATH /home/rvm/ RVM_ARCHFLAGS="arch i386"`

- You can also use environment variables in other instructions

```
ENV TARGET_DIR /opt/app
WORKDIR $TARGET_DIR
```

- The env variables will be persisted into any containers built from the image.

## USER

- Specifies a user that the image should be run as.

`USER nginx`

## VOLUME

- Adds volumes to any container created from the image. A volume is a designated directory within a container that provides persistent shared data.

`VOLUME ['opt/project"]`

## ADD

- Used to add files and directories from our build environment into our image. You cannot add files from outside the build environment or context.
- If the destination ends in a /, then it considers the source a directory. If it doesn’t end in a /, it considers the source a file.

- The source file can also be a url

`ADD software.lic /opt/application/software.lic`

## COPY

- Closely related to the ADD instruction. Difference is COPY does not have decompression and extraction abilities.

`COPY conf.d/ /etc/apache2/`

## LABEL

- Adds metadata to the docker image.
  `LABEL version="1.0"`
  `LABEL location="New York" type="Data Center" role="Web Server"`

## ARG

- Defines variables that can be passed at build via the docker build command, done using the `--build-arg` flag. You can only specify build-time arguments that have been defined in the Dockerfile.

```
ARG build
ARG webapp_user=user //sets a default
```

Used like so:
`docker build --build-arg build=1234 -t jamtur01/webapp .`

## SHELL

- Allows the default shell used for the shell form of commands to be overridden.
  Useful on platforms with multiple shells.

## HEALTHCHECK

- Tells Docker how to test to check that a container is still working properly.
  `HEALTHCHECK --interval=10s --timeout=1m --retries=5 CMD curl http://localhost || exit 1`

## ONBUILD

- Adds triggers to images. A trigger is executed when an image is used as the basis of another image.

```
ONBUILD ADD . /app/src
ONBUILD RUN cd /app/src; make
```

# Docker push

- Use `docker push <image_name>` to push an image to Docker Hub
- Use `docker rmi <image_name>` to remove an image.

# Running your own docker registry

- For images that you dont want to make public:

  1. Make use of private repositories on the Docker Hub
  2. Run your own registry behind a firewall.

First run the registry container
`docker run -d -p 5000:5000 --name registry registry:2`

- Then tag the image
  `docker tag 54f5b7ddc177 docker.example.com:6000/omoga/static_web`
- Then push the image to the local registry
  `docker push docker.example.com:6000/omoga/static_web `
