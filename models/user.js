const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    description: {type: String},
    avatarUrl: {type: String},
});

module.exports = mongoose.model("User", UserSchema);
