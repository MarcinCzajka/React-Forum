const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const {User, validateUser} = require('../models/user');
const axios = require('axios');

router.get("/", auth, async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(400).send('No users were created yet.');

    res.send(_.map(users, _.partialRight(_.pick, ['_id', 'name', 'avatar'])));
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send('User with given ID doesnt exist.');

    res.send(_.pick(user, ['_id', 'name', 'email', 'avatar']));
});

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.');

    user = await User.findOne({ name: req.body.name });
    if(user) return res.status(400).send('Username already taken.');


    const captchaValidation = await axios({
        method: 'POST',
        url: 'https://www.google.com/recaptcha/api/siteverify', 
        params: {
            response: req.header('captchaToken'),
            secret: '6LdPf8kUAAAAAPxSQ2lnpqEe19CaB55y4V8SjqlJ'
        }
    });
    
    if(!captchaValidation.data.success) return res.status(400).send('Captcha verification failed.');

    user = new User(_.pick(req.body, ['_id', 'name', 'password', 'email', 'avatar']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    try {
        await user.save();
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal server error.');
    };

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.put('/avatar/:id', auth, async (req, res) => {
    if(req.user._id !== req.params.id) {
        return res.status(401).send('Access denied.');
    }

    const { avatar } = req.body;
    if(!validateString(avatar)) {
        return res.status(400).send('Invalid url.');
    }

    const result = await User.findByIdAndUpdate(req.params.id, {avatar: avatar});
    res.status(200).send(result.avatar);
});

function validateString(str) {
    if(typeof str !== 'string') return false;
    if(str === '') return false;

    return true
};

module.exports = router;