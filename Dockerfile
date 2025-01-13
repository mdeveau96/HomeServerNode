FROM alpine:latest

RUN apk add --update nodejs npm

WORKDIR /

RUN mkdir /uploads

VOLUME /uploads

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]