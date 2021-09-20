const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(bodyParser.raw({limit: '10mb', extended: true}))

app.use(express.raw());
app.use(express.static('public'));

// sendFile will go here
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/video-chunk', (req, res) => {
    fs.appendFile('public/myvideo.webm', req.body, function (err) {
        if (err) throw err;
        console.log('Chunck Saved!');
    })
    res.sendStatus(200);

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);