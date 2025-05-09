# Use an official Node.js image
FROM node:21.6.0

# Set the working directory
WORKDIR /app

# Copy the frontend code
COPY . /app

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Run the Next.js development server
CMD ["sh", "-c", "npm run dev"]