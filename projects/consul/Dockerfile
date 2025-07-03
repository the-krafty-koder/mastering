FROM ubuntu:latest
LABEL maintainer="wayneomoga@gmail.com"
ENV REFRESHED_AT 2025-06-26

RUN apt-get -yqq update && apt-get install -yqq curl unzip

RUN curl -fsSL https://releases.hashicorp.com/consul/1.15.2/consul_1.15.2_linux_amd64.zip -o /tmp/consul.zip && \
    unzip /tmp/consul.zip -d /usr/sbin && \
    chmod +x /usr/sbin/consul && \
    rm /tmp/consul.zip

ADD consul.json /config/
EXPOSE 53/udp 8300 8301 8301/udp 8302 8302/udp 8400 8500

VOLUME ["/data"]

ENTRYPOINT ["/usr/sbin/consul", "agent", "-config-dir=/config"]
CMD []