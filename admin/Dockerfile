# Step 1: Use Node.js as the base image for building
FROM node:18 as build

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use a lightweight server to serve the built files
FROM nginx:alpine

# Step 8: Copy the dist folder (or build folder) to Nginx's default directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Step 9: Copy the custom Nginx configuration (if needed for routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 10: Expose the admin port (5174)
EXPOSE 5174

# Step 11: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
