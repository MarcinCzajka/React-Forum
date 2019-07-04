const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    nick: {
        type: String
    },
    avatar: {
        type: String,
        default: "https://docs.appthemes.com/files/2011/08/gravatar-grey.jpg"
    },
    email: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(User) {
    const schema = {
        nick: Joi.string(),
        avatar: Joi.string(),
        email: Joi.string()
    };
    return Joi.validate(forumPost, schema)
};

module.exports = {
    User: User,
    validateUser: validateUser
};