const express = require('express');
const router = express.Router();
const {ForumPost, validateForumPost} = require('../models/forumPost');

router.get("/", async (req, res) => {
    const posts = await ForumPost.find();
    if(!posts) return res.status(400).send('There are no posts in this room.');

    res.status(200).send(posts);
});

router.get("/:id", async (req, res) => {
    const post = await ForumPost.findById(req.params.id);
    if(!post) return res.status(400).send('This post doesnt exist anymore.');

    res.status(200).send(post);
});

router.post("/", async (req, res) => {
    const { error } = validateForumPost(req.body);
	if(error) return res.status(400).send(error.details[0].message);
    
    const post = new ForumPost(req.body);
	
	await post.save();
	res.status(200).send(post);
});

router.delete("/:id", async (req, res) => {
    const result = ForumPost.findByIdAndDelete(req.params.id);
    
    console.log(req.params.id)
    res.status(200).send("Post deleted.");
});

module.exports = router;