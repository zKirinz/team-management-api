const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {type: String, required: true, index: true},
    description: {type: String, default: ""},
    avatarUrl: {type: String, default: ""},
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    isPublished: {type: Boolean, default: true},
});

TeamSchema.index({name: 1});

module.exports = mongoose.model("Team", TeamSchema);
