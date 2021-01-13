
const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"

let posts = [{
                text: "This is my second post",
                userID: "1",
                hasImg: true,
                imgs: [defaultIcon, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8v9ILAxQmocV9nN7ZOkEOmiiinKz73NFpsw&usqp=CAU"]
            },
            {
                text: '#new profile pic',
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

const getPosts = (req, res) => {
    const id = req.params.id;
    const count = req.params.count;

    res.json(JSON.stringify(posts.slice(0, Math.min(count > 0 ? count : 100, posts.length))))
}

const getLogin = (req, res) => {
    let { passWord, userName } = JSON.parse(req.params.login);
    if(accountMap.has(userName)){
        res.json(JSON.stringify(accountMap.get(userName).userID));
    }
    else{
        res.json('""');
    }
}

const postNewPost = (req, res) => {
    if(req.params.post){
        posts.push(JSON.parse(req.params.post));
        res.send('success');
    }
}

module.exports = {
    getUser,
    getPosts,
    getLogin,
    postNewPost
}