FROM node:latest
WORKDIR /usr/src/app
COPY package* ./
RUN npm install --production
COPY . .
RUN webpack -d
CMD ["npm","run","start"]