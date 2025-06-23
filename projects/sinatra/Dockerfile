FROM ruby:3.2-slim
LABEL maintainer="wayneomoga"
ENV REFRESHED_AT 2025-06-25

RUN apt-get update -yqq && \
    apt-get install -yqq build-essential redis-tools && \
    gem install --no-document sinatra json redis rackup puma

RUN mkdir -p /opt/webapp
EXPOSE 4567
CMD [ "/opt/webapp/bin/webapp" ]

