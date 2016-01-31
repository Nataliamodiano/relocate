var express = require('express');
var app = express();
var yelp = require('./yelp-api.js');
var indeed = require('./indeed-api.js');
var walkscore = require('./walk-score-api.js')

app.use(express.static('server/public'));
app.use(express.static('public/'));
app.use('/yelp-api', yelp);
app.use('/indeed-api', indeed);
app.use('/walk-score-api', walkscore);

var port = process.env.PORT || 8080;
app.listen(port);