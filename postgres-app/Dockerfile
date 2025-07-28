FROM postgres:16.7-alpine3.21
RUN mkdir /sql-src
COPY tables /sql-src/tables
COPY docker-entrypoint-initdb.d/* /docker-entrypoint-initdb.d
