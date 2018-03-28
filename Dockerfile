FROM node:9

COPY . /usr/rws
WORKDIR /usr/rws
# RUN ls -la
# RUN apt-get update
#RUN apt-get install curl -y
# RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - && apt-get install nodejs -y

WORKDIR /usr/rws/app
RUN npm install
# COPY /usr/rws/app/index.prod.html /usr/rws/api/build/index.html
RUN npm run prod-build

WORKDIR /usr/rws/api
RUN npm install
EXPOSE 4501

CMD ["npm", "run", "prod-server"]
