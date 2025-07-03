FROM ubuntu:latest
LABEL maintainer="wayneomoga@gmail.com"

RUN apt-get -yqq update && apt-get install -yqq wget
VOLUME ["/var/lib/tomcat8/webapps/"]
WORKDIR /var/lib/tomcat8/webapps/

ENTRYPOINT ["wget"]
CMD "-?"