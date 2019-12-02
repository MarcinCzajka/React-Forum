const mongoose = require('mongoose');
const Joi = require('joi');

const ForumRoomSchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    lastActivityDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    description: {
        type: String,
        minlength: 15,
        maxlength: 500,
        required: true
    }, 
    shortDescription: {
        type: String,
        minlength: 15,
        maxlength: 150,
        required: true
    },
    category: {
        type: String,
        default: "General",
        required: true
    },
    image: {
        type: String
    },
    colorScheme: {
        type: String,
        default: "standard",
        required: true
    }
});

const ForumRoom = mongoose.model('ForumRoom', ForumRoomSchema);

function validateForumRoom(forumRoom) {
    const schema = {
        authorId: Joi.string().required(),
        date: Joi.date().required(),
        lastActivityDate: Joi.date().required(),
        description: Joi.string().min(15).max(500).required(),
        shortDescription: Joi.string().min(15).max(150).required(),
        category: Joi.string().required(),
        image: Joi.string().allow(''),
        colorScheme: Joi.string().required()
    };
    return Joi.validate(forumRoom, schema)
};

module.exports = {
    ForumRoom: ForumRoom,
    validateForumRoom: validateForumRoom
};