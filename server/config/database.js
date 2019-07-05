const mongoose = require('mongoose');
const {database} = require('./default.json');

module.exports = () => {
    mongoose.connect(database, {useNewUrlParser: true})
        .then(() => console.log("Connected to MongoDB..."))
        .catch(err => console.log(err));
};