FROM node:18
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY prisma .
COPY src ./src
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]
