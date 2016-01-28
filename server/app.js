var express = require('express');
var app = express();
var yelp = require('./yelp-api.js');
var indeed = require('./indeed-api.js');

app.use(express.static('server/public'));
app.use('/yelp-api', yelp);
app.use('/indeed-api', indeed);

app.listen(8000);
