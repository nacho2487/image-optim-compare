var Kraken = require("kraken");

var kraken = new Kraken({
    "api_key": "39f5d172fb2e027561b80fefa80ab6af",
    "api_secret": "dcc9c9470fb018a17609b3fe20b4c1260b6b0c02"
});


module.exports = function(filePath){
    return new Promise(function(resolve, reject) {
        var params = {
            file: filePath,
            wait: true
        };
        kraken.upload(params, function (status) {
            if (status.success) {
                console.log(status);
                resolve(status);
                console.log("Success. Optimized image URL: %s", status.kraked_url);
            } else {
                reject(status.message);
                console.log("Fail. Error message: %s", status.message);
            }
        });
    });
}
