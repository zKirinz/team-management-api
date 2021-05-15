const {successResponseCreator} = require("../../helpers/response");

const User = require("../../models/user");
const {MAX_USERS} = require("./schemas");

const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;

class UserService {
    constructor(fastify) {
        this.fastify = fastify;
    }

    async register_user(name, email, password) {
        if (!emailReg.test(email)) {
            throw this.fastify.httpErrors.badRequest("Email is invalid");
        }

        const usersNumber = await User.estimatedDocumentCount();
        if (usersNumber >= MAX_USERS) {
            throw this.fastify.httpErrors.badRequest(
                `This app cannot have more than ${MAX_USERS} users`
            );
        }

        const existsUser = await User.findOne({email});
        if (existsUser) {
            throw this.fastify.httpErrors.badRequest("Email is already exists");
        }

        const createdUser = await User.create({
            name,
            email,
            password,
            description: "",
            avatarUrl: "",
        });
        if (!createdUser) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        const token = await this.fastify.jwt.sign({name, email});
        if (!token) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        return successResponseCreator(201, "Register successfully", {token});
    }

    async login_user(email, password) {
        if (!emailReg.test(email)) {
            throw this.fastify.httpErrors.badRequest("Email is invalid");
        }

        const existsUser = await User.findOne({email});
        if (!existsUser) {
            throw this.fastify.httpErrors.notFound("Email is not exist");
        }

        const isMatchedPassword = await this.fastify.bcrypt.compare(password, existsUser.password);
        if (!isMatchedPassword) {
            throw this.fastify.httpErrors.badRequest("Password is incorrect");
        }

        const token = await this.fastify.jwt.sign({name: existsUser.name, email});
        if (!token) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        return successResponseCreator(200, "Login successfully", {token});
    }

    async getProfile_user(user) {
        const {name, description, avatarUrl} = user;
        return successResponseCreator(200, "Get profile successfully", {
            name,
            description,
            avatarUrl,
        });
    }

    async get_user(limit, offset, search) {
        let filteredUsers;
        if (search) {
            const regex = new RegExp(search);
            if (!limit || !offset) {
                filteredUsers = await User.find({
                    $and: [{$or: [{name: regex}, {description: regex}]}],
                });
            } else {
                filteredUsers = await User.find({
                    $and: [{$or: [{name: regex}, {description: regex}]}],
                })
                    .skip(offset * limit)
                    .limit(limit);
            }
        } else {
            if (!limit || !offset) {
                filteredUsers = await User.find();
            } else {
                filteredUsers = await User.find()
                    .skip(offset * limit)
                    .limit(limit);
            }
        }

        if (filteredUsers.length === 0) {
            return successResponseCreator(200, "Get users successfully", []);
        }

        return successResponseCreator(200, "Get users successfully", filteredUsers);
    }

    async updateProfile_user(user, name, description, avatarUrl) {
        user.name = name;
        user.description = description;
        user.avatarUrl = avatarUrl;
        const updatedUser = await user.save();
        if (updatedUser !== user) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        return successResponseCreator(200, "Update profile successfully", {
            name,
            email: user.email,
            description,
            avatarUrl,
        });
    }

    async changePassword_user(user, password, newPassword) {
        if (password === newPassword) {
            throw this.fastify.httpErrors.badRequest(
                "New password must different from your current password"
            );
        }

        const isMatchedPassword = await this.fastify.bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            throw this.fastify.httpErrors.badRequest("Password is incorrect");
        }

        user.password = newPassword;
        const updatedUser = await user.save();
        if (updatedUser !== user) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        return successResponseCreator(200, "Change password successfully");
    }
}

module.exports = UserService;
