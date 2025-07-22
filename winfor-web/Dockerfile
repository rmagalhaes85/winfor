FROM node:lts-alpine3.22 as base
RUN npm install -g @angular/cli
WORKDIR /app
COPY package.json ./
RUN npm install
COPY angular.json tsconfig.app.json tsconfig.json ./
ENV VITE_PORT 4200
EXPOSE 4200
