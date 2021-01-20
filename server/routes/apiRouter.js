const express = require('express');
const path = require('path')

const apiRouter = express.Router();
const { getUser, getPosts, getSignIn, postNewPost, postSignUp, checkUserExists, postImage } = require(path.join(__dirname, '..', 'controller', 'apiController'));

apiRouter.get('/posts', getPosts);
apiRouter.post('/posts', postNewPost);

apiRouter.get('/user', getUser);

apiRouter.post('/sign-in', getSignIn);
apiRouter.post('/sign-up', postSignUp);

apiRouter.get('/username', checkUserExists);

apiRouter.post('/image', postImage)

apiRouter.get('/',(req, res)=>{
    res.redirect('/');
})

module.exports = apiRouter;
