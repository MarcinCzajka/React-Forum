const mongoose = require('mongoose');
const {database} = require('./default.json');

module.exports = () => {
    mongoose.connect(database, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
        .then(() => console.log("Connected to MongoDB..."))
        .catch(err => console.log(err));
};