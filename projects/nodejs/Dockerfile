FROM ubuntu:latest

LABEL maintainer="wayneomoga@gmail.com"
ENV REFRESHED_AT=2025-06-26

# Install dependencies and Node.js 18
RUN apt-get -yqq update && \
    apt-get install -yqq curl build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -yqq nodejs

# Create log directory
RUN mkdir -p /var/log/nodeapp

# Copy app code
COPY nodeapp /opt/nodeapp/
WORKDIR /opt/nodeapp

# Install Node dependencies
RUN npm install

# Persist log data
VOLUME [ "/var/log/nodeapp" ]

# Expose app port
EXPOSE 3000

# Run app
CMD [ "node", "server.js" ]
