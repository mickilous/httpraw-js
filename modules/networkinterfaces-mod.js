var os = require('os')

module.exports = function (callback) {

    var networkInterfaces = os.networkInterfaces();

    Object.keys(networkInterfaces).forEach(function (ifname) {
        var alias = 0;
        networkInterfaces[ifname].forEach(function (ifDetails) {
            if ('IPv4' != ifDetails.family || ifDetails.internal != false)
                return;

            if (alias >= 1) // this single interface has multiple ipv4 addresses
                callback(ifname + ':' + alias, ifDetails.address);
            else // this interface has only one ipv4 adress            
                callback(ifname, ifDetails.address);

            ++alias;
        });
    });

}

