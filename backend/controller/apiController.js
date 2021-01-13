
const defaultIcon = "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"

const posts = [{
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et netus et malesuada fames ac turpis egestas maecenas. Amet luctus venenati",
                    userID: "1",
                    hasImg: false
                }, 
                {
                    text: "I have a dream",
                    userID: "2",
                    hasImg: false
                }, 
                {
                    text: "Coding is super fun",
                    userID: "3",
                    hasImg: false
                },
                {
                    text: "I will hack the world 😎",
                    userID: "4",
                    hasImg: false
                },
                {
                    text: "I don't exist",
                    userID: "5",
                    hasImg: false
                },
                {
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
                }
                ]

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

    console.log(count);
    res.json(JSON.stringify(posts.slice(0, Math.min(count, posts.length))))
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

module.exports = {
    getUser,
    getPosts,
    getLogin
}