FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN npm install 
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

