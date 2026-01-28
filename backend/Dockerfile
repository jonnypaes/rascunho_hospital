FROM node:18-alpine
WORKDIR /app

# Install tools globally so they are in the system PATH
#RUN npm install -g ts-node-dev typescript
RUN npm install -g tsx

COPY package*.json ./
# Install everything (dev + prod)
RUN npm install

COPY . .

EXPOSE 3000
# Run the dev script which uses ts-node-dev
CMD ["npm", "run", "dev"]