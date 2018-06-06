FROM node
EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm set registry https://registry.npm.taobao.org
ADD package.json /usr/src/app/
ADD package-lock.json /usr/src/app/
RUN npm install
RUN npm run build:clientRelease
ADD . /usr/src/app/
RUN npm run build
CMD ["npm", "run", "start"]