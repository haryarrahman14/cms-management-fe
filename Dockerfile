FROM btpns/node:22.16-alpine

# user
USER root

# Set working directory inside the container
WORKDIR /app

# Ensure correct permissions for /app
RUN mkdir -p /app && chmod -R 777 /app

# Ensure correct permissions for /app
RUN mkdir -p /app/node_modules && chmod -R 777 /app/node_modules

# Set npm cache to a writable directory
RUN npm config set cache /.npm

# Ensure npm cache directory is writable
RUN mkdir -p /.npm/_logs && chmod -R 777 /.npm

# Copy package.json and install dependencies first
COPY package*.json ./

# Install dependencies before copying the rest of the files
RUN npm install

# Copy the rest of the application code
COPY . .

RUN ls -al

# Expose the port your app runs on
EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev"]
