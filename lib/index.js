const express = require('express');
const os = require('os');
const uuid = require('uuid/v4')();
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URL = process.env.MONGODB_URL || (process.env.NODE_ENV === 'production' ? 'mongodb://test:1234@mongo:27017/test' : 'mongodb://localhost:27017/test');
const MONGODB_DBNAME = process.env.MONGODB_DBNAME || 'test';
const PORT = process.env.PORT || 9000;

console.log('MONGODB_URL', MONGODB_URL);
console.log('MONGODB_DBNAME', MONGODB_DBNAME);
console.log('PORT', PORT);
console.log('env', JSON.stringify(process.env, null, 2));

const app = express()
  .get('/db', (req, res, next) => {
    MongoClient.connect(MONGODB_URL, (err, client) => {
      if (err) return next(err);

      const collection = client.db(MONGODB_DBNAME).collection('example');
      collection.insert([
        { value: 1 },
        { value: 2 },
        { value: 3 }
      ], { w: 1 }, (err, result) => {
        if (err) return next(err);

        collection.find({}).toArray((err, data) => {
          if (err) return next(err);

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
      ip: req.ip,
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
