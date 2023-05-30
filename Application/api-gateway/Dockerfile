FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm ci

ENV PORT=9000
EXPOSE $PORT

CMD ["npm", "start"]