const mongoose = require('mongoose');
const Joi = require('joi');

const ForumRoomSchema = new mongoose.Schema({
    creatorId: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    lastActivityDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    category: {
        type: String,
        default: "General"
    },
    image: {
        type: String
    },
    colorScheme: {
        type: String,
        default: "standard"
    }
});

const ForumRoom = mongoose.model('ForumRoom', ForumRoomSchema);

function validateForumRoom(forumRoom) {
    const schema = {
        authorId: Joi.string(),
        date: Joi.date(),
        lastActivityDate: Joi.date(),
        description: Joi.string(),
        category: Joi.string(),
        image: Joi.string().allow(''),
        colorScheme: Joi.string()
    };
    return Joi.validate(forumRoom, schema)
};

module.exports = {
    ForumRoom: ForumRoom,
    validateForumRoom: validateForumRoom
};