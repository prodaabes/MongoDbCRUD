require('./db.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200).send('Hello World');
});

const postController = require('./controllers/postController.js');
app.use('/posts', postController);

const port = process.env.PORT || 80;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});