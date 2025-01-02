# Use Node.js LTS version as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the backend port
EXPOSE 4000

# Command to run the backend
CMD ["npm", "start"]
