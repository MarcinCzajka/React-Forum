const mongoose = require('mongoose');
const Joi = require('joi');

const ForumPostSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    responseTo: {
        type: String
    }
});

const ForumPost = mongoose.model('ForumPost', ForumPostSchema);

function validateForumPost(forumPost) {
    const schema = {
        content: Joi.string()
    };
    
    return Joi.validate(forumPost, schema)
};

module.exports = {
    ForumPost: ForumPost,
    validateForumPost: validateForumPost
};