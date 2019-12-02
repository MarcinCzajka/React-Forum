const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {ForumPost, validateForumPost} = require('../models/forumPost');

router.get("/", async (req, res) => {
    //const responseTo = new RegExp(req.query.responseTo || /./, "gi");

    const responseTo = req.query.responseTo || "";

    const posts = await ForumPost.find({responseTo: responseTo});
    if(!posts) return res.status(400).send('There are no posts in this room.');

    res.status(200).send(posts);
});

router.get("/:id", async (req, res) => {
    const post = await ForumPost.findById(req.params.id);
    if(!post) return res.status(400).send('This post doesnt exist anymore.');

    res.status(200).send(post);
});

router.post("/", auth, async (req, res) => {
    const { error } = validateForumPost(req.body);
	if(error) return res.status(400).send(error.details[0].message);
    
    const post = new ForumPost(req.body);
	
	await post.save();
	res.status(200).send(post);
});


router.delete("/:id", auth, async (req, res) => {
    const result = await ForumPost.findByIdAndDelete(req.params.id)
    if (!result) return res.status(400).send('No post exists under given ID.')
    
    res.status(200).send("Post deleted.");
});

module.exports = router;