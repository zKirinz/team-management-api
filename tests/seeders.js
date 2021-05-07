const User = require("../models/user");
const Team = require("../models/team");

const createUsers = async () => {
    const promise1 = User.create({
        email: "test1@test.com",
        name: "User 1",
        password: "password",
        description: "Content 1",
        avatarUrl: "test1.com",
    });
    const promise2 = User.create({
        email: "test2@test.com",
        name: "User 2",
        password: "password",
        description: "Content 2",
        avatarUrl: "test2.com",
    });
    const promise3 = User.create({
        email: "test3@test.com",
        name: "User 3",
        password: "password",
        description: "Content 3",
        avatarUrl: "test3.com",
    });
    await Promise.all([promise1, promise2, promise3]);
};

const createTeams = async () => {
    const user1 = await User.findOne({email: "test1@test.com"});
    const user2 = await User.findOne({email: "test2@test.com"});

    const promise1 = Team.create({
        name: "Front-end",
        description: "A group for learning Front-end",
        creator: user1._id,
        isPublished: true,
    });
    const promise2 = Team.create({
        name: "Desktop development",
        description: "A group for learning DeskNtop development",
        creator: user1._id,
        isPublished: false,
    });
    const user1Teams = await Promise.all([promise1, promise2]);
    user1.teams = user1Teams.map((team) => team._id);
    await user1.save();

    const promise3 = Team.create({
        name: "Back-end",
        description: "A group for learning Back-end",
        creator: user2._id,
        isPublished: true,
    });
    const promise4 = Team.create({
        name: "Mobile development",
        description: "A group for learning Mobile development",
        creator: user2._id,
        isPublished: true,
    });
    const promise5 = Team.create({
        name: "Devops",
        description: "A group for learning Devops",
        creator: user2._id,
        isPublished: true,
    });
    const promise6 = Team.create({
        name: "Testing",
        description: "A group for learning Testing",
        creator: user2._id,
        isPublished: true,
    });
    const promise7 = Team.create({
        name: "Web design",
        description: "A group for learning Web design",
        creator: user2._id,
        isPublished: true,
    });
    const promise8 = Team.create({
        name: "OOP",
        description: "A group for learning OOP",
        creator: user2._id,
        isPublished: false,
    });
    const user2Teams = await Promise.all([
        promise3,
        promise4,
        promise5,
        promise6,
        promise7,
        promise8,
    ]);
    user2.teams = user2Teams.map((team) => team._id);
    await user2.save();
};

module.exports = {
    createUsers,
    createTeams,
};
