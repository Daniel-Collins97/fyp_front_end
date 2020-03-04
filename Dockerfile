# Use the official image as a parent image
FROM node:7

# Set the working directory
# WORKDIR /usr/src/app

# Copy the file from your host to your current location
COPY package.json /app

# Run the command inside your image filesystem
RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node

RUN npm install
RUN npm rebuild node-sass

COPY . ..

# Run the specified command within the container.
CMD ["npm", "start"]

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080