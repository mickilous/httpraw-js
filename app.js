#! /usr/bin/env node

var express = require('express');
var bodyParser = require('body-parser')
var os = require('os')
var httpraw = require('./modules/httpraw-mod.js')
var displayNetwork = require('./modules/networkinterfaces-mod.js')

var app = express();
var port = process.argv[2]
if (isNaN(port))
    port = 9999

app.use(bodyParser.raw({type: '*/*'}))

app.use(function (req, res, next) {

    var result = ''
    httpraw(req, function (line) {
        console.log(line)
        result += line + os.EOL
    }, function () {
        res.send(result)
    })

    next()
})

app.listen(port, function () {
    console.log('Httpraw-js listening at')
    displayNetwork(function (ifName, ip) {
        console.log('  ', ip + ':' + port, '(' + ifName + ')');
    })
});