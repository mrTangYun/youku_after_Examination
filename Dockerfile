FROM node

MAINTAINER tangyun <mr.tangyun@gmail.com>

WORKDIR /home/project

EXPOSE 3000

CMD ["npm", "start"]