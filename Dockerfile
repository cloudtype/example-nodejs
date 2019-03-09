FROM node:10-alpine
COPY . /home/node/app
WORKDIR /home/node/app
ENV NODE_ENV=production
RUN  npm install
EXPOSE 3000
CMD npm start
