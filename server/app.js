const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/apiRouter');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/build/index.html'));
})

app.use('/api', apiRouter)

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT || 5050);