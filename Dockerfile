# Step 1: Use a Node.js image to run the Angular app
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular project into the container
COPY . .

# Expose the default Angular development server port
EXPOSE 4200

# Start the Angular development server
CMD ["npm", "start"]
