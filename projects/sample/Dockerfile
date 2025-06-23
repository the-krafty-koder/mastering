FROM ubuntu:18.04
LABEL maintainer="wayneomoga"
ENV REFRESHED_AT 2025-06-20
RUN apt -y update; apt install -y nginx
RUN mkdir -p /var/www/html/website
ADD global.conf /etc/nginx/conf.d/
ADD nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
