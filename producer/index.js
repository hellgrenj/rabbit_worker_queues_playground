const express = require('express');
const PORT = 1337;
const rabbit = require('./rabbit');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// http://localhost:1337/putonq/THIS%20IS%20A%20MESSAGE
app.get('/putonq/:message', (req, res) => {
    rabbit.sendToQueue(req.params.message);
    res.send('placed the message on the worker queue');
});

app.post('/putonq', (req, res) => {
    rabbit.sendToQueue(req.body.query);
    res.send('placed the message on the worker queue');
});

setTimeout(() => {
    rabbit.init(() => {
        app.listen(PORT);
        console.log('Running on http://localhost:' + PORT);
    });
}, 5000);
