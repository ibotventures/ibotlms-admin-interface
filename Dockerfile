# Step 1: Build the Angular app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Build the Angular app with the correct base-href
RUN ng build --base-href /admin/
