FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm ci

ENV PORT=3001

CMD ["npm", "start"]