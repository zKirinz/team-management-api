const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    avatarUrl: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});

module.exports = mongoose.model("Team", TeamSchema);
