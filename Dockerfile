FROM node:16-bullseye-slim

RUN apt update
RUN apt install build-essential -y
RUN apt install python3 -y
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
USER node

EXPOSE 9000

COPY --chown=node:node ./package.json .
COPY --chown=node:node . .

RUN chmod -R 777 /home/node/app
RUN npm install -D --force
RUN npm run build

CMD ["node", "/home/node/app/server.js"]