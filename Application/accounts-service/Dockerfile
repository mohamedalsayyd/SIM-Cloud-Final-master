FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm ci

ENV PORT=3002

CMD ["npm", "start"]