#!/bin/sh
set -e

yarn install --frozen-lockfile

exec "$@"