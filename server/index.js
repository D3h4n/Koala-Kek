const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const { PORT, MONGODB_URI, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const apiRouter = require(path.join(__dirname, 'routes', 'apiRouter'));

const app = express();

cloudinary.config({
    cloud_name: 'koala-kek',
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

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
