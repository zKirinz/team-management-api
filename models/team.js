const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, default: ""},
    avatarUrl: {type: String, default: ""},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    isPublished: {type: Boolean, default: true},
});

module.exports = mongoose.model("Team", TeamSchema);
