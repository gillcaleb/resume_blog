# Base on offical Node.js Alpine image
FROM node:18.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install --global pm2
# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

RUN npm config set unsafe-perm true

# Install dependencies
RUN npm install --production 

# Copy all files
COPY ./ ./

# Build app
RUN npm run build --verbose

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
