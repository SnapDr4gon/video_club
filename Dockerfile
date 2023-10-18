FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 90

CMD PORT=90 npm start