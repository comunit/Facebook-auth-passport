const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    facebookId    : String,
    name          : String,
    last_name     : String,
    first_name    : String,
    gender        : String,
    picture       : String
});

const user = mongoose.model('user', userSchema);

module.exports = user;