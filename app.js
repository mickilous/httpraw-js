var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.raw());

app.use(function (req, res, next) {
    console.log('------------------')
    console.log(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion)

    console.log('--- Header ---')
    logFields(req.headers);

    console.log('--- Parameters ---')
    logFields(req.query)

    console.log('--- Content ---')
    next()
})

function logFields(obj) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key))
            continue
        console.log(key + ": " + obj[key])
    }
}


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});