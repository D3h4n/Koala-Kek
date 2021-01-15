const express = require('express');

const apiRouter = express.Router();
const { getUser, getPosts, getLogin, postNewPost } = require('../controller/apiController');

apiRouter.get('/posts/', getPosts);
apiRouter.post('/posts/', postNewPost);
apiRouter.get('/user/', getUser);
apiRouter.get('/sign-in/', getLogin);

apiRouter.get('/',(req, res)=>{
    res.send('Index');
})

module.exports = apiRouter
