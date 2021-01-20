const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5050;
require('dotenv').config();

const apiRouter = require(path.join(__dirname, 'routes', 'apiRouter'));

const app = express();

mongoose.connect(process.env.DBURI,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        app.listen(PORT, () => {
            console.log(`listening on port: ${PORT}`);
        })
    })
    .catch(err => console.error(err))
    
// MiddleWare and Static Files
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', apiRouter);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
