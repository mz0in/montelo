# Use an official Node.js runtime as a parent image
FROM node:21 as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json to the working directory
COPY package.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your application
RUN npm run build

# Production image, copy all the files and run next
FROM node:21 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Define the command to run your app using CMD which defines your runtime
CMD ["npm", "run", "start:prod"]
