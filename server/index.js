const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, DBURI } = process.env;

const port = PORT || 5050;

const apiRouter = require(path.join(__dirname, 'routes', 'apiRouter'));

const app = express();

mongoose.connect(DBURI,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        app.listen(port, () => {
            console.log(`listening on port: ${port}`);
        })
    })
    .catch(err => console.error(err))
    
// MiddleWare and Static Files
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', apiRouter);

app.use((req, res, next) => {
    res.send(path.join(__dirname, '..', 'build', 'index.html'));
});
