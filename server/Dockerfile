# Use an official Node.js runtime as a parent image
FROM node:18-alpine



# Install OpenSSL
RUN apk add --no-cache openssl

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json ./ 

# Copy the Prisma schema and directory
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the app
CMD ["npm", "start"]
