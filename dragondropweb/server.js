const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./server/routes/api.route');

const mongoURI = 'mongodb://localhost/dragondrop';
mongoose.connect(mongoURI, {server: {socketOptions: {keepAlive: 1}}})
  .then(() =>{
    console.log('Connected to dragondrop db at localhost');
  })
  .catch(err => console.error(err));

mongoose.set('debug', (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, doc);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, () => console.log('listening on port 3000'));
