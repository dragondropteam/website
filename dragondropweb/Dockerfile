FROM ubuntu:xenial 
EXPOSE 4200/tcp
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    curl \
    g++ \
    make  
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list 
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
RUN echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.6 main" | tee /etc/apt/sources.list.d/mongodb-org-3.6.list
RUN apt-get update && apt-get install -y \
    mongodb-org \
    nginx \
    nodejs \
    yarn
RUN service nginx start
COPY dragondropweb /etc/nginx/sites-available/
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/dragondropweb /etc/nginx/sites-enabled/dragondropweb
WORKDIR /var/www/
COPY package.json /var/www
RUN yarn
ENV JWT_SECRET test_secret
CMD ["yarn", "start"]
