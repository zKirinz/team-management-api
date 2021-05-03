const User = require("../models/user");
const {hashString} = require("../helpers/bcrypt");

const createUsers = async () => {
    const password = await hashString("password");
    const promise1 = User.create({
        email: "test1@test.com",
        name: "User 1",
        password: password,
        description: "Content 1",
        avatarUrl: "test1.com",
    });
    const promise2 = User.create({
        email: "test2@test.com",
        name: "User 2",
        password: password,
        description: "Content 2",
        avatarUrl: "test2.com",
    });
    const promise3 = User.create({
        email: "test3@test.com",
        name: "User 3",
        password: password,
        description: "Content 3",
        avatarUrl: "test3.com",
    });
    await Promise.all([promise1, promise2, promise3]);
};

module.exports = {
    createUsers,
};
