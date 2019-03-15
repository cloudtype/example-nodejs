const express = require('express');
const os = require('os');
const uuid = require('uuid/v4')();
const MongoClient = require('mongodb').MongoClient;

const app = express()
  .get('/db', (req, res, next) => {
    try {
      MongoClient.connect('mongodb://mongo:27017', (err, client) => {
        assert.equal(null, err);
        res.send('Connected successfully to server');
        client.db(dbName);
        client.close();
      });
    } catch(err) {
      next(err);
    }
  })
  .get('/', (req, res) => {
    res.send('<pre>' + JSON.stringify({
      db,
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
