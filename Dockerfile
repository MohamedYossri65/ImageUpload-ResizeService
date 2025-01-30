FROM node:20

WORKDIR /uploadImage

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm" ,"run","start:dev"]
