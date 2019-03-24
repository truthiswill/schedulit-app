FROM node:latest
WORKDIR /usr/src/app
COPY package* ./
RUN npm install --production
COPY . .
CMD ["npm","run","start"]