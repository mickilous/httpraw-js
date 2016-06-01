module.exports = function (req, callback, done) {

    callback('------------------')
    callback(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion)

    callback('--- Header ---')
    readFields(req.headers, callback)

    callback('--- Parameters ---')
    readFields(req.query, callback)

    callback('--- Content ---')
    if (req.body.length > 0)
        callback(req.body.toString())

    done()

}

function readFields(obj, callback) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key))
            continue
        callback(key + ": " + obj[key])
    }
}
