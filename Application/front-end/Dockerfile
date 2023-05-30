FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm ci

ENV PORT=3003
EXPOSE $PORT

CMD ["npm", "start"]