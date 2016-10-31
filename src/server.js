var express = require('express');
var app = express();
var path = require('path');
var upload = require('./multer');
var kraken = require('./kraken');
var imageoptim = require('./imageoptim');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, './client'), { maxAge: 31557600000 }));

app.post('/upload', upload.single('file'), function(req, res){
    console.log(req.file);
    var pathFile = path.join(req.file.destination, req.file.filename);
    imageoptim(pathFile).then(function(imageOptim){
        kraken(pathFile).then(function(imageKraken){
            var respones = {
                kraken: {
                    url: imageKraken.kraked_url,
                    size: imageKraken.kraked_size
                },
                optim: {
                    url: imageOptim.header['content-location'],
                    size: imageOptim.header['content-length']
                },
                local: {
                    url:  '/uploads/' + req.file.filename,
                    size: req.file.size
                }
            };
            res.status(201).send(respones);
        });
    });
});


app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});