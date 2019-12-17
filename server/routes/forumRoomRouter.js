const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const softAuth = require('../middleware/softAuth');
const admin = require('../middleware/admin');
const {ForumRoom, validateForumRoom} = require('../models/forumRoom');

router.get("/", softAuth, async (req, res) => {
    const category = new RegExp(req.query.category || /./, "gi");

    const rooms = await ForumRoom.find({category: category});
    if(!rooms) return res.status(400).send('No rooms exist yet.');

    if(req.user) {
        const result = rooms.map(room => {
            const liked = (room.upvotesByUserId.indexOf(req.user._id) === -1 ? false : true);
            
            return {...room.toObject(), liked: liked};
        });
        return res.status(200).send(result);
    }

    res.status(200).send(rooms);
});

router.get("/:id", softAuth, async (req, res) => {
    const room = await ForumRoom.findByIdAndUpdate(req.params.id, { $inc: { views: 1 }},  {new: true });
    if(!room) return res.status(400).send('That room doesnt exist anymore.');

    res.status(200).send(room);
});

router.post("/", auth, async (req, res) => {
    const { error } = validateForumRoom(req.body);
	if(error) return res.status(400).send(error.details[0].message);
    
    const room = new ForumRoom(req.body);
	
	await room.save();
	res.status(200).send(room);
});

router.put("/:id", auth, async (req, res) => {
    const usersThatLikeThis = await ForumRoom.findById(req.params.id).select('upvotesByUserId')
    const isLiked = usersThatLikeThis.upvotesByUserId.indexOf(req.user._id);

    const newArr = usersThatLikeThis.upvotesByUserId;
    if(isLiked === -1) {
        newArr.push(req.user._id)
    } else {   
        newArr.splice(isLiked, 1)
    }

    const result = await ForumRoom.findByIdAndUpdate(req.params.id, {upvotesByUserId: newArr, upvotes: newArr.length}, {new: true});

    res.status(200).send({upvotes: result.upvotes, liked:(isLiked === -1 ? true : false)});
});

router.delete("/:id", [auth, admin], async (req, res) => {
    const result = await ForumRoom.findByIdAndDelete(req.params.id)
    if (!result) return res.status(400).send('No room exist under given id.')
    
    res.status(200).send("Room deleted.");
});

module.exports = router;