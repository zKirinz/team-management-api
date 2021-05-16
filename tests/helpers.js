const User = require("../models/user");
const app = require("../server");
const supertest = require("supertest");
const {getUserToken} = require("../helpers/jwt");

const cleanup = async (db) => {
    await db.dropDatabase();
    await db.close();
    await app.close();
};

const request = async () => {
    await app.ready();
    return supertest(app.server);
};

const createTokenUser = async (email) => {
    const user = await User.findOne({email});
    const token = await getUserToken({name: user.name, email});
    return `Bearer ${token}`;
};

const getUser = async (email) => {
    const user = await User.findOne({email});
    return user;
};

module.exports = {
    request,
    cleanup,
    createTokenUser,
    getUser,
};
