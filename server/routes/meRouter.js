const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const {User, validateUser} = require('../models/User');

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user._id);

    res.send(_.pick(user, ['_id', 'name', 'email', 'avatar']));
});

module.exports = router;