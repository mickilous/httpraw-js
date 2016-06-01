var express = require('express');
var bodyParser = require('body-parser')

var app = express();


app.use(bodyParser.raw());

app.use(function(req, res, next){
    console.log('------------------')
    console.log(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion)

    console.log('--- Header ---')
    // console.log(req.headers)
    for (var key in req.headers) {
        if (req.headers.hasOwnProperty(key)) {
            console.log(key + ": " + req.headers[key])
        }
    }
    console.log('--- Parameters ---')
    console.log('--- Content ---')
    console.log(req.body)
    console.log("LOGGED")
    res.send('LOGGED')
    next()
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});