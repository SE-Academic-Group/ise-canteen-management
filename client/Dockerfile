FROM node:20.4.0-alpine

# Create app directory
WORKDIR /client

# NOTE: seperate COPY commands to take advantage of Docker's build cache and only rebuild the layers that have changed

  # Copy package.json and package-lock.json to /app
COPY package*.json ./

# Set up client directory
RUN yarn install

# Copy the rest of the client and server code
COPY . .
COPY ./src ./src

EXPOSE 5173