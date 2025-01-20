#!/bin/bash
set -e

# Connect to the default database 'postgres' and create the required database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    CREATE DATABASE ${POSTGRES_DB};
EOSQL
