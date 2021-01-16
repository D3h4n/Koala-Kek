const express = require('express');

const apiRouter = express.Router();
const { getUser, getPosts, getLogin, postNewPost, postSignUp, checkUserExists } = require('../controller/apiController');

apiRouter.get('/posts', getPosts)
apiRouter.post('/posts', postNewPost)
apiRouter.get('/user', getUser);
apiRouter.post('/sign-in', getLogin);
apiRouter.post('/sign-up', postSignUp);
apiRouter.get('/username', checkUserExists);

apiRouter.get('/',(req, res)=>{
    res.send('Index');
})

module.exports = apiRouter
