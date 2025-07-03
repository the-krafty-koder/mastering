FROM ubuntu:18.04
LABEL maintainer="james@example.com"
ENV REFRESHED_AT=2016-06-01

RUN apt-get -qqy update && \
    apt-get -qyy install  \
    python3 \
    python3-dev \
    python3-pip \
    ruby-dev \
    git \
    libcurl4-openssl-dev \
    curl \
    build-essential \
    libpcre3-dev \
    libssl-dev

RUN gem install --no-document sinatra:2.0.8.1

RUN pip3 install uwsgi

RUN mkdir -p /opt/distributed_app
WORKDIR /opt/distributed_app

RUN uwsgi --build-plugin https://github.com/unbit/uwsgi-consul

COPY uwsgi-consul.ini /opt/distributed_app/
COPY config.ru /opt/distributed_app/

ENTRYPOINT ["uwsgi","--ini","uwsgi-consul.ini","--ini","uwsgi-consul.ini:server1", "--ini", "uwsgi-consul.ini:server2"]
CMD []
