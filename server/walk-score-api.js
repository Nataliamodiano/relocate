var express = require('express');
var request = require('request');
var walkscoreRouter = express.Router();

walkscoreRouter.get('/:lat/:long', function(req, res) { 
  var url = 'http://api.walkscore.com/score?format=json&address=&lat='
   + req.params.lat + '&lon=' + req.params.long + '&wsapikey=d879f4ab60b880141d08c9d33a316bc0';
  request(url, function (error, response, body) {
    if (error) {
      return console.log('error');
    }

    if (response.statusCode !== 200) {
      return console.log('status code ' + response.statusCode);
    }

    if (!error && response.statusCode == 200) {
      console.log(req.originalUrl);
      res.send(body);
    } 
  });
});

module.exports = walkscoreRouter;
