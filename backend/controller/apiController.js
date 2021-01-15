
const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"

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
accountMap.set('Dehan', {userName: 'Dehan', passWord: '123', userID: '1'});
accountMap.set('Nerd231', {userName: 'Nerd231', passWord: 'Haha', userID: '2'});

const getUser = (req, res) => {
    const id = req.params.id;
    let user;

    switch(id){
        case '1': user = {
            userID: '1',
            userName: 'Dehan',
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v9ILAxQmocV9nN7ZOkEOmiiinKz73NFpsw&usqp=CAU"
        }
        break;
    
        case '2': user = {
            userID: '2',
            userName: 'Nerd231',
            icon: defaultIcon
        }
        break;

        case '3': user = {
            userID: '3',
            userName: 'Pearson',
            icon: defaultIcon
        }
        break;

        case '4': user = {
            userID: '4',
            userName: 'Hackerman',
            icon: defaultIcon
        }
        break;

        default: user = null;
    }

    res.json(JSON.stringify(user));
}

const getLen = (count) => {
    return Math.min(count > 0 ? (count > 50 ? 20 : count) : 20, posts.length)
}

const getPosts = (req, res) => {
    const id = req.params.id;
    const count = req.params.count;

    res.json(JSON.stringify(posts
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, getLen(count))));
}

const getLogin = (req, res) => {
    let { passWord, userName } = req.body;

    let account = accountMap.get(userName);

    if( account && passWord === account.passWord){
        res.json(JSON.stringify(accountMap.get(userName).userID));
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