const express = require('express');
const router = express.Router();
const {ForumPost, validateForumPost} = require('../models/forumPost');

router.get("/", async (req, res) => {
    const posts = await ForumPost.find();
    if(!posts) return res.status(400).send('There are no posts in this room.');

    res.send(posts);
});

router.post("/", async (req, res) => {
    console.log(req.body)
    const { error } = validateForumPost(req.body);
	if(error) return res.status(400).send(error.details[0].message);
    
    console.log(req.body)
    const post = new ForumPost(req.body);
    
    console.log(post);
	
	await post.save();
	res.send(post);
});

module.exports = router;