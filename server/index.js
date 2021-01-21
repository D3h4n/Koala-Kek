const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('./utils/cloudinary');

require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

const apiRouter = require(path.join(__dirname, 'routes', 'apiRouter'));

const app = express();



mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        app.listen(PORT || 5050, () => {
            console.log(`listening on port: ${PORT || 5050}`);
        })
    })
    .catch(err => console.error(err))
    
// MiddleWare and Static Files
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({
    limit: '200kb'
}));
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', apiRouter);

app.use((req, res, next) => {
    res.sendFile('index.html');
});
