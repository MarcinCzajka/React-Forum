const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/User');

router.get("/", async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(400).send('No users were created yet.');

    res.send(users);
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send('User with given ID doesnt exist.');

    res.send(user);
});

module.exports = router;