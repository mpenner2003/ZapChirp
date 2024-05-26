const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true }, // Require a username
    password: { type: String, required: true }, // Require a password for the user
});

const User = mongoose.model('User', UserSchema);
module.exports = User;