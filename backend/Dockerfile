# Postgres base.
FROM postgres:13

# Copy database schema to docker entrypoint directory.
COPY schema.sql /docker-entrypoint-initdb.d/init.sql
