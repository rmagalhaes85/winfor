FROM node:lts-alpine3.22 as base
RUN npm install -g @angular/cli
WORKDIR /app
COPY angular.json package.json tsconfig.app.json tsconfig.json ./
RUN npm install
ENV VITE_PORT 4200
EXPOSE 4200
