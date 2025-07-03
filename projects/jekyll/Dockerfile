FROM ubuntu:latest
LABEL maintainer="wayneomoga@gmail.com"
ENV REFRESHED_AT 2025-06-25

RUN apt-get -yqq update && apt-get install -yqq ruby ruby-dev build-essential nodejs
RUN gem install jekyll

VOLUME /data
VOLUME /var/www/html
WORKDIR /data

ENTRYPOINT [ "jekyll", "build","--destination=/var/www/html" ]