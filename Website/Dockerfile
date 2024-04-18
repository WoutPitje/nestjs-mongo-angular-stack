# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# Bundle app source
COPY . .

RUN npm install

# Build your app
RUN npm run build

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

USER node:node

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "build/index.js" ]
