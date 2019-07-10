const express = require('express');
const router = express.Router();
const {ForumRoom, validateForumRoom} = require('../models/forumRoom');

router.get("/", async (req, res) => {
    const category = new RegExp(req.query.category || /./, "gi");

    const rooms = await ForumRoom.find({category: category});
    if(!rooms) return res.status(400).send('No rooms exist yet.');

    res.status(200).send(rooms);
});

router.get("/:id", async (req, res) => {
    const room = await ForumRoom.findById(req.params.id);
    if(!room) return res.status(400).send('That room doesnt exist anymore.');

    res.status(200).send(room);
});

router.post("/", async (req, res) => {
    const { error } = validateForumRoom(req.body);
	if(error) return res.status(400).send(error.details[0].message);
    
    const room = new ForumRoom(req.body);
	
	await room.save();
	res.status(200).send(room);
});


router.delete("/:id", async (req, res) => {
    const result = await ForumRoom.findByIdAndDelete(req.params.id)
    if (!result) return res.status(400).send('No room exist under given id.')
    
    res.status(200).send("Room deleted.");
});

module.exports = router;