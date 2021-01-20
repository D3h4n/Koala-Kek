const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    hasImg: {
        type: Boolean,
        required: true
    },
    imgs: {
        type: Array,
        required: false
    }   
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);