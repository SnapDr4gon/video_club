FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 90

CMD PORT=90 DATABASE_URL=mongodb://mongo:4Ba4GGHeGH22afD1G3GECab1Ed-fe--A@monorail.proxy.rlwy.net:54685 npm start