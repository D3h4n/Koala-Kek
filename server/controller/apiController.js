const Account = require("../models/Account");
const Post = require("../models/Post");
const defaultIcon =
  "https://res.cloudinary.com/koala-kek/image/upload/v1611439651/koala_kek/default-user-image_lvfd2w.png";
const cloudinary = require("../utils/cloudinary");

const getUser = (req, res) => {
  let { id } = req.query;
  Account.findById(id, { displayName: 1, userName: 1, id: 1, icon: 1 })
    .then((account) => {
      res.json(JSON.stringify(account));
    })
    .catch((err) => {
      console.error(err);
      res.json(null);
    });
};

const getLen = (count) => {
  return Math.min(count > 0 ? (count > 50 ? 20 : count) : 20, posts.length);
};

const getPosts = (req, res) => {
  const postLimit = 20;
  const { userID, count } = req.query;

  let numPosts = parseInt(count);

  Post.find(userID !== "none" ? { userID } : {})
    .limit(numPosts > postLimit || numPosts < 1 ? postLimit : numPosts)
    .sort({ createdAt: -1 })
    .then((posts) => res.json(JSON.stringify(posts)))
    .catch((err) => console.error(err));
};

const getSignIn = (req, res) => {
  let { passWord, userName } = req.body;

  Account.findOne({ userName: userName }, { passWord: 1, userID: 1 })
    .then((result) => {
      if (result && result.passWord === passWord) {
        res.json(JSON.stringify(result.id));
      } else {
        res.json(null);
      }
    })
    .catch((err) => {
      console.error(err);
      res.json(null);
    });
};

const checkUserExists = (req, res) => {
  let { userName } = req.query;

  Account.find({ userName })
    .then((result) => {
      res.json(result.length > 0);
    })
    .catch((err) => console.error(err));
};

const postSignUp = (req, res) => {
  let account = new Account({
    ...req.body,
    icon: defaultIcon,
  });

  account
    .save()
    .then((response) => res.json(JSON.stringify(response.id)))
    .catch((err) => console.error(err));
};

const postNewPost = (req, res) => {
  let post = new Post(req.body);

  post
    .save()
    .then(({ createdAt, id }) => res.json(JSON.stringify({ createdAt, id })))
    .catch((err) => {
      console.error(err);
      res.json(null);
    });
};

const postImage = (req, res) => {
  try {
    const fileStr = req.body.data;
    cloudinary.uploader
      .upload(fileStr, { upload_preset: "koala_kek_post" })
      .then((response) => {
        res.json(JSON.stringify(response.secure_url));
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.error(error);
    res.json(null);
  }
};

module.exports = {
  getUser,
  getPosts,
  getSignIn,
  postNewPost,
  postSignUp,
  checkUserExists,
  postImage,
};
