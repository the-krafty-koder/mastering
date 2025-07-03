FROM ubuntu:18.04
LABEL maintainer="wayneomoga@gmail.com"
ENV REFRESHED_AT 2025-06-25

RUN apt-get -yqq update && \
    apt-get install -yqq software-properties-common && \
    add-apt-repository ppa:chris-lea/redis-server && \
    apt-get -yqq update && \
    apt-get install -yqq redis-server redis-tools

VOLUME ["/var/lib/redis", "/var/log/redis"]
EXPOSE 6379
CMD []