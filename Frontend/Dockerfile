FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install --only=production
EXPOSE 4000
CMD ["node", "dist/appname/server/server.mjs"]
