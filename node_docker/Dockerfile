FROM node:latest
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY app/package.json /usr/src/app
RUN npm install
RUN npm install pm2 -g

# Bundle app source
COPY app/ /usr/src/app

EXPOSE 3000

CMD ["node", "server.js"]
