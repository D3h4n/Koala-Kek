
const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
const defaultUser = {userID: '-1', userName: '', displayName: 'User not found', icon: defaultIcon }

let posts = [{
                postID: '1',
                text: "This is my first post",
                timestamp: new Date("January 13, 2021 12:48:00"),
                userID: "1",
                hasImg: true,
                imgs: [defaultIcon, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v9ILAxQmocV9nN7ZOkEOmiiinKz73NFpsw&usqp=CAU"]
            },
            {
                postID: '2',
                text: '#new profile pic',
                timestamp: new Date("January 13, 2021 12:47:00"),
                userID: '4',
                hasImg: true,
                imgs: [defaultIcon]
            }]

const accountMap = new Map();
const signInMap = new Map();

signInMap.set('Dehan', '1');
signInMap.set('Nerd231', '2');

accountMap.set('1', {displayName: 'Deshawn Knight', userName: 'Dehan', passWord: '123', userID: '1', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v9ILAxQmocV9nN7ZOkEOmiiinKz73NFpsw&usqp=CAU"});
accountMap.set('2', {displayName: 'Soho Person YESSIR!!!', userName: 'Nerd231', passWord: 'Haha', userID: '2', icon: defaultIcon});

const getUser = (req, res) => {
    let {id} = req.query;
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
        user = defaultUser;
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
    let { passWord, userName } = req.query;

    let account = accountMap.get(signInMap.get(userName));

    if( account && passWord === account.passWord){
        res.json(JSON.stringify(accountMap.get(account.userID).userID));
    }
    else{
        res.json('""');
    }
}

const postNewPost = (req, res) => {
    let post = req.body;
    post.timestamp = new Date();

    posts.push(post);

    res.json(JSON.stringify({timestamp: post.timestamp, postID: '-1'}));
}

module.exports = {
    getUser,
    getPosts,
    getLogin,
    postNewPost
}