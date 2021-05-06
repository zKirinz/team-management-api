const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    description: {type: String, default: ""},
    avatarUrl: {type: String, default: ""},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
});

module.exports = mongoose.model("User", UserSchema);
