const express = require('express');
const router = express.Router();
const {ForumPost, validateForumPost} = require('../models/forumPost');

router.get("/", async (req, res) => {
    const posts = await ForumPost.find();
    if(!posts) return res.status(400).send('There are no posts in this room.');

    res.send(posts);
});

router.post("/", async (req, res) => {
    const { error } = validateForumPost(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	
	const posts = new ForumPost(req.body);
	
	await posts.save();
	res.send(posts);
});

module.exports = router;