FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads/profiles

# Expose port
EXPOSE 8080

# Start server
CMD ["npm", "start"]
