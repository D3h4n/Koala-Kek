const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
})

app.listen(PORT);