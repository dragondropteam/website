/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const express = require('express');
const app = express();
const formidable = require('express-formidable');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./server/routes/api.route');
const downloadRoutes = require('./server/routes/download.route');
const helmet = require('helmet');
const config = require('./server/config/config.dev');


mongoose.connect(config.mongo.host, { server: { socketOptions: { keepAlive: 1 } } })
  .then(() =>{
    console.log('Connected to dragondrop db at localhost');
  })
  .catch(err => console.error(err));

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, doc);
  });
}

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', apiRoutes);

app.use('/download', downloadRoutes);

app.use('/docs', express.static(path.join(__dirname, 'server/static/docs')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(config.port, () => console.log(`listening on port ${config.port}`));
