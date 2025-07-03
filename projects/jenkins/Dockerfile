FROM jenkins/jenkins:lts
LABEL maintainer="wayneomoga@gmail.com"
ENV REFRESHED_AT "2025-06-25"

USER root
RUN apt-get -y update && apt-get install -yqq sudo wget
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
RUN wget http://get.docker.com/builds/Linux/x86_64/docker-latest.tgz
RUN tar -xvzf docker-latest.tgz
RUN mv docker/* /usr/bin/

USER jenkins
RUN jenkins-plugin-cli --plugins junit git git-client ssh-slaves greenballs chucknorris ws-cleanup