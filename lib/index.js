const express = require('express');
const os = require('os');
const uuid = require('uuid/v4')();
const MongoClient = require('mongodb').MongoClient;

const app = express()
  .get('/db', (req, res, next) => {
    MongoClient.connect('mongodb://localhost:30002/test', (err, client) => {
      if( err ) return next(err);
      client.close();
      res.send('<pre>' + JSON.stringify({
        url: client.s.url,
        options: client.s.options,
        poolSize: client.topology.s.poolSize,
        platform: client.topology.clientInfo
      }, null, 2) + '</pre>');
    });
  })
  .get('/', (req, res) => {
    res.send('<pre>' + JSON.stringify({
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
