There are 3 APIs in the docker system

- Registry API -> provides integration with Docker registry.
- Docker Hub API -> provides integration with Docker Hub
- Docker Engine API -> provides integration with the Docker daemon.

# Accessing a remote docker daemon

Expose Docker's API over TCP so it can be accessed remotely using `docker -H`.

## Steps (for systemd-based Linux)

### 1. Create a systemd override

1. `sudo systemctl edit docker`
2. Add the following
   ```
    [Service]
    ExecStart=
    ExecStart=/usr/bin/dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375
   ```
3. Reload and restart docker

   ```
        sudo systemctl daemon-reload
        sudo systemctl restart docker
   ```

4. Find the VM's IP address
   ```
    ip a
   ```
5. Test remote access from another machine
   `docker -H tcp://192.168.64.6:2375 info`

# Managing images with the API

- `curl http://192.168.64.6:2375/images/json` - used to list images on a remote docker daemon.
- You can also get details for specific image and search images.

# Managing containers with the API

- `curl http://192.168.64.6:2375/containers/json` - list all containers
