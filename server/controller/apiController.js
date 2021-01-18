const uuid = require('uuid').v4


const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
const defaultUser = {userID: '-1', userName: '', displayName: 'User not found', icon: defaultIcon }

const accountMap = new Map();
const userIdMap = new Map();

const posts = []

const getUser = (req, res) => {
    let { id } = req.query;
    let account = accountMap.get(id);

    let user;

    if(account){
        user = {
            displayName: account.displayName,
            userName: account.userName,
            userID: account.userID,
            icon: account.icon
        }
    }
    else{
        user = null;
    }

    res.json(JSON.stringify(user));
}

const getLen = (count) => {
    return Math.min(count > 0 ? (count > 50 ? 20 : count) : 20, posts.length)
}

const getPosts = (req, res) => {
    const {id, count} = req.query;

    res.json(JSON.stringify(posts
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, getLen(count))));
}

const getLogin = (req, res) => {
    let { passWord, userName } = req.body;

    let account = accountMap.get(userIdMap.get(userName));

    if( account && passWord === account.passWord){
        res.json(JSON.stringify(account.userID));
    }
    else{
        res.json('""');
    }
}

const checkUserExists = (req, res) => {
    let { userName } = req.query;
    
    res.json(JSON.stringify(userIdMap.has(userName)));
}

const postSignUp = (req, res) => {
    let newAccount = req.body;

    newAccount.userID = uuid();
    newAccount.icon = defaultIcon;

    userIdMap.set(newAccount.userName, newAccount.userID);
    accountMap.set(newAccount.userID, newAccount);

    res.json(JSON.stringify(newAccount.userID));
}

const postNewPost = (req, res) => {
    let post = req.body;
    post.timestamp = new Date();

    posts.push(post);

    res.json(JSON.stringify({timestamp: post.timestamp, postID: uuid()}));
}

module.exports = {
    getUser,
    getPosts,
    getLogin,
    postNewPost,
    postSignUp,
    checkUserExists
}