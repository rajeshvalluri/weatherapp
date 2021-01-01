FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000 8080 80

CMD ["node", "src/app.js"]
