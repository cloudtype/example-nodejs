const express = require('express');
const os = require('os');
const uuid = require('uuid/v4')();
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = process.env.NODE_ENV === 'production' ? 'mongodb://mongo:27017' : 'mongodb://localhost:27017';
const dbName = 'test';

const app = express()
  .get('/db', (req, res, next) => {
    MongoClient.connect('mongodb://mongo:27017', (err, client) => {
      if( err ) return next(err);

      const collection = client.db(dbName).collection('example');
      collection.insert([
        { value: 1 },
        { value: 2 },
        { value: 3 }
      ], {w: 1}, (err, result) => {
        if( err ) return next(err);

        collection.find({}).toArray((err, data) => {
          if( err ) return next(err);

          res.send('<pre>' + JSON.stringify({
            url: client.s.url,
            options: client.s.options,
            poolSize: client.topology.s.poolSize,
            platform: client.topology.clientInfo,
            data
          }, null, 2) + '</pre>');

          client.close();
        });
      });
    });
  })
  .get('/', (req, res) => {
    res.send('<pre>' + JSON.stringify({
      version: 5,
      uuid,
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cpus: os.cpus(),
      networkInterfaces: os.networkInterfaces(),
      env: process.env
    }, null, 2) + '</pre>');
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
