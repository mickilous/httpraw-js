var os = require('os')
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var port = process.argv[2]
if (isNaN(port))
    port = 9999

app.use(bodyParser.raw({type: '*/*'}))

app.use(function (req, res, next) {

    var requestString = ''

    function add(message) {
        requestString += message + os.EOL
    }

    add('------------------')
    add(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion)

    add('--- Header ---')
    add(getFields(req.headers));

    add('--- Parameters ---')
    add(getFields(req.query))

    add('--- Content ---')
    if (req.body.length > 0)
        add(req.body.toString())

    console.log(requestString)
    res.send(requestString)

    next()
})

function getFields(obj) {
    var result = ''
    for (var key in obj) {
        if (!obj.hasOwnProperty(key))
            continue
        result += key + ": " + obj[key] + os.EOL
    }
    return result
}

app.listen(port, function () {
    console.log('Httpraw-js listening on port', port, '!');
});