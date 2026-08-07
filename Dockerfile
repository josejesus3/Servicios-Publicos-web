FROM  node:24.16.0
WORKDIR /app
COPY  package*.json ./

RUN npm install 
COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]
EXPOSE 4200
