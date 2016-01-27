var express = require('express');
var app = express();
var yelp = require('./yelp-api.js');

app.use(express.static('server/public'));
app.use('/yelp-api', yelp);

app.listen(8000);
