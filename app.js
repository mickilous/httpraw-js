var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = process.argv[2]
if (isNaN(port))
    port = 9999

app.use(bodyParser.raw({type: '*/*'}))

app.use(function (req, res, next) {

    console.log('------------------')
    console.log(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion)

    console.log('--- Header ---')
    logFields(req.headers);

    console.log('--- Parameters ---')
    logFields(req.query)

    console.log('--- Content ---')
    if (req.body.length > 0)
        console.log(req.body.toString())

    res.send('LOGGED')
    next()
})

function logFields(obj) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key))
            continue
        console.log(key + ": " + obj[key])
    }
}


app.listen(port, function () {
    console.log('Httpraw-js app listening on port', port, '!');
});