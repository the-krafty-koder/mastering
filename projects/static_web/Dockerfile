FROM ubuntu:18.04
LABEL maintainer='omondio254@gmail.com'
RUN apt-get update; apt-get install -y nginx
RUN echo "Hi, i am in your container" \
    >/var/www/html/index.html
EXPOSE 80