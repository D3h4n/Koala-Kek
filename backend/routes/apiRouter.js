const express = require('express');

const apiRouter = express.Router();
const { getUser, getPosts, getLogin, postNewPost } = require('../controller/apiController');

apiRouter.get('/posts/id=:id&count=:count', getPosts);
apiRouter.post('/posts/post=:post', postNewPost);
apiRouter.get('/user/id=:id', getUser);
apiRouter.get('/user/login=:login', getLogin);

apiRouter.get('/',(req, res)=>{
    res.send('Index');
})

module.exports = apiRouter
