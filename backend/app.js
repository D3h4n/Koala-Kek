const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const apiRouter = require('./routes/apiRouter');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.use('/api', apiRouter)

app.listen(process.env.PORT || 5050);