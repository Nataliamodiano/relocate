var express = require('express');
var request = require('request');
var indeedRouter = express.Router();

indeedRouter.get('/:keyword/:location', function(req, res) { 
  var url = 'http://api.indeed.com/ads/apisearch?publisher=2066335092962849&format=json&q='
   + req.params.keyword + '&l=' + req.params.location + '&sort=&radius=&st=&jt=fulltime&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=relocate&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';
  request(url, function (error, response, body) {
    if (error) {
      return console.log('error');
    }

    if (response.statusCode !== 200) {
      return console.log('status code');
    }

    if (!error && response.statusCode == 200) {
      console.log(req.originalUrl);
      res.send(body);
    } 
  });
});

module.exports = indeedRouter;