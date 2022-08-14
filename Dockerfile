FROM node:18.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm config set unsafe-perm true

RUN npm install --production 

COPY ./ ./

RUN npm run build --verbose

EXPOSE 3000

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]
