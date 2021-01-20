const express = require('express');
const path = require('path')

const apiRouter = express.Router();
const { getUser, getPosts, getSignIn, postNewPost, postSignUp, checkUserExists } = require(path.join(__dirname, '..', 'controller', 'apiController'));

apiRouter.get('/posts', getPosts);
apiRouter.post('/posts', postNewPost);
apiRouter.get('/user', getUser);
apiRouter.post('/sign-in', getSignIn);
apiRouter.post('/sign-up', postSignUp);
apiRouter.get('/username', checkUserExists);

apiRouter.get('/',(req, res)=>{
    res.send('This is an api not a website');
})

module.exports = apiRouter;
