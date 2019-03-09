const express = require('express');
const os = require('os');
const uuid = require('uuid/v4')();

const app = express()
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
