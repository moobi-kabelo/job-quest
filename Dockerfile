# Use a specific Node.js version
FROM node:18-alpine3.18

ENV PORT=4200
ENV NODE_ENV=production

WORKDIR /job-quest

# Copy only the package.json and nx.json files to leverage Docker cache
COPY package*.json nx.json ./

# Install Nx globally
RUN npm install -g nx@17.2.8

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Install Nx dependencies locally
RUN npx nx install

# Build the application
RUN npx nx build --prod

EXPOSE 4200

CMD ["node", "./dist/job-quest/main.js"]
