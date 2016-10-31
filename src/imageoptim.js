var request = require('superagent');

module.exports = function(filePath) {
    return new Promise(function(resolve, reject) {
        request.post('https://im2.io/cllbbljbdn/full')
            .attach('file', filePath)
            .then(function (result) {
                console.log(result);
                resolve(result);
            });
    });
}