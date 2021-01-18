const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5050;

const apiRouter = require(path.join(__dirname, 'routes', 'apiRouter'));

const app = express();

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

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});