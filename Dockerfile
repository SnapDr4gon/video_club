FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 90

CMD PORT=90 DATABASE_URL=mysql://root:3n3Sv7sBWt6AcYFZY1GJ@containers-us-west-81.railway.app:6874/railway npm start