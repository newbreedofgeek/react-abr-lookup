FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY build ./build
COPY proxy.js ./
EXPOSE 49160
CMD [ "npm", "run", "start-prod" ]