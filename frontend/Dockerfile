# Use an official Node.js image
FROM node:21.6.0

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies first (better for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Create the .next directory (to avoid runtime errors)
RUN mkdir -p .next/static/development

# Expose the port
EXPOSE 3000

# Run the Next.js development server
CMD ["npm", "run", "dev"]
