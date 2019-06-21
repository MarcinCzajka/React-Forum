const express = require('express');
const router = express.Router();
const {ForumPost, validateForumPost} = require('../models/forumPost');

router.get("/", async (req, res) => {
    console.log(1)
    const posts = await ForumPost.find();
    console.log(posts)
    if(!posts) return res.status(400).send('There are no posts here.');

    res.send(posts);
});

module.exports = router;