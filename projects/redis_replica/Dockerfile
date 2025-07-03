FROM omoga/redis
LABEL maintainer="wayneomoga@gmail.com"
ENV REFRESHED_AT 2025-06-25

ENTRYPOINT ["redis-server", "--protected-mode no", "--logfile /var/log/redis/redis-replica.log", "--slaveof redis_primary 6379"]