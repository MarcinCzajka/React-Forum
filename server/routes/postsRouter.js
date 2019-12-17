const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {ForumPost, validateForumPost} = require('../models/forumPost');

router.get("/", async (req, res) => {
    const responseTo = req.query.responseTo || "";

    const posts = await ForumPost.find({responseTo: responseTo});
    if(!posts) return res.status(400).send('There are no posts in this room.');

    res.status(200).send(posts);
});

router.get("/top", async (req, res) => {
    const posts = await ForumPost.find({responseTo: req.query.responseTo})
        .sort({upvotes: -1})
        .limit(Number(req.query.limit));
    if(!posts) return res.status(400).send('No posts found.');

    res.status(200).send(posts);
});

router.get("/responseTo", async (req, res) => {
    const posts = await ForumPost.find({roomId: req.query.room})
    if(!posts) return res.status(200).send({nrOfComments: 0});

    res.status(200).send({comments: posts.length});
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
    const post = await ForumPost.findById(req.params.id);
    if(req.user._id !== post.authorId) {
        return res.status(403).send('You are not owner of this post.')
    };

    const result = await ForumPost.findByIdAndDelete(req.params.id)
    if (!result) return res.status(400).send('No post exists under given ID.')
    
    res.status(200).send("Post deleted.");
});

module.exports = router;