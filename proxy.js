const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/proxy', (req, res) => {
  req.pipe(request(req.url.substring(1))).pipe(res);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(process.env.PORT || port);
console.log(`Proxy server up on ${port}...`);