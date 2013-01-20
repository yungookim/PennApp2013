#!/bin/bash

npm install
mkdir logs
touch ./logs/out.log
touch ./logs/err.log

export NODE_ENV="production"

sudo forever start -o logs/out.log -e logs/err.log app.js
