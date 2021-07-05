# Dockerfile

# https://github.com/lambci/docker-lambda is a docker image that "almost replicates lambda environment"
FROM lambci/lambda:build-nodejs12.x

COPY . .


RUN rm -rf node_modules
#&& rm package-lock.json

RUN npm i
