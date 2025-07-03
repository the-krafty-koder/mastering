# Volumes

- Volumes are special directories within one or more containers that bypass the layered Union filesystem to provide persistent/shared data for Docker. Changes to a volume are made directly and bypass an image. They will not be included when we commit or build an image.
- Volumes can also be shared between containers and also persist between containers.
- The -v option works by specifying a directory or mount on the local host that is seperated from the directory on the container with a `:`
- You can also specify the read-write status by adding a `ro` / `rw` after the volume directory.

`docker run -d -p 80 --name website -v $PWD/website:/var/www/html/website omoga/nginx nginx`

N/B - You can use volumes to store application code. Map the directory of the local code directory to one in the container and use nginx to serve from the container directory.Any changes you make locally will be reflected in the container volume

- Volumes can also be shared across containers. Below, the new container will have access to website's volumes.

`docker run -d -P --volumes-from website jamtur01/apache`
