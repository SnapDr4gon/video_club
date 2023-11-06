FROM node
WORKDIR /app
COPY . .
ENV MONGODB_URL='mongodb://mongo:4Ba4GGHeGH22afD1G3GECab1Ed-fe--A@monorail.proxy.rlwy.net:54685'
RUN npm install
EXPOSE 3000
CMD PORT=3000 npm start