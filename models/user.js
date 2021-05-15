const mongoose = require("mongoose");
const {hashString} = require("../helpers/bcrypt");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    password: {type: String, required: true},
    description: {type: String, default: ""},
    avatarUrl: {type: String, default: ""},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
});

UserSchema.index({email: 1}, {unique: true});

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const hashedPassword = await hashString(user.password);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model("User", UserSchema);
