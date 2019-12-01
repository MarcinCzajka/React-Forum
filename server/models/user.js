const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 15,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1024
    },
    avatar: {
        type: String,
        minlength: 10,
        default: "https://docs.appthemes.com/files/2011/08/gravatar-grey.jpg"
    }
});

const User = mongoose.model('User', userSchema);

const complexityOptions = {
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 4,
}

function validateUser(User) {
    const schema = {
        name: Joi.string().min(5).max(15).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: new PasswordComplexity(complexityOptions).required(),
        avatar: Joi.string().min(10)
    };
    return Joi.validate(User, schema)
};

module.exports = {
    User: User,
    validateUser: validateUser
};