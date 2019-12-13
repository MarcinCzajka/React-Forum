const mongoose = require('mongoose');
const Joi = require('joi');

const ForumPostSchema = new mongoose.Schema({
    authorId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String
    },
    responseTo: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    }
});

const ForumPost = mongoose.model('ForumPost', ForumPostSchema);

function validateForumPost(forumPost) {
    const schema = {
        authorId: Joi.string(),
        date: Joi.date(),
        content: Joi.string(),
        responseTo: Joi.string().allow('')
    };
    return Joi.validate(forumPost, schema)
};

module.exports = {
    ForumPost: ForumPost,
    validateForumPost: validateForumPost
};