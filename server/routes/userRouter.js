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

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar: req.body.avatar
    });

    await user.save();

    res.send(user);
});

module.exports = router;