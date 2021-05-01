const {successResponseCreator, errorResponseCreator} = require("../../helpers/response");

const User = require("../../models/user");

async function register_user(req, reply) {
    if (req.validationError) {
        reply.code(400).send(errorResponseCreator(400, "Bad Request", "Request is invalid"));
    }

    const {name, email, password} = req.body;

    const existedUser = await User.findOne({email});
    if (existedUser) {
        throw this.httpErrors.badRequest("Email is already exists");
    }

    const hashedPassword = await this.bcrypt.hash(password);
    const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        description: "",
        avatarUrl: "",
    });
    if (!createdUser) {
        throw this.httpErrors.internalServerError("Something went wrong");
    }

    const token = await this.jwt.sign({name, email});
    if (!token) {
        throw this.httpErrors.internalServerError("Something went wrong");
    }

    return successResponseCreator(201, "Register successfully", {token});
}

async function login_user(req, reply) {
    if (req.validationError) {
        reply.code(400).send(errorResponseCreator(400, "Bad Request", "Request is invalid"));
    }

    const {email, password} = req.body;

    const existedUser = await User.findOne({email});
    if (!existedUser) {
        throw this.httpErrors.notFound("Email is not exist");
    }

    const isMatchedPassword = await this.bcrypt.compare(password, existedUser.password);
    if (!isMatchedPassword) {
        throw this.httpErrors.badRequest("Password is incorrect");
    }

    const token = await this.jwt.sign({name: existedUser.name, email});
    if (!token) {
        throw this.httpErrors.internalServerError("Something went wrong");
    }

    return successResponseCreator(200, "Login successfully", {token});
}

async function getProfile_user(req, reply) {
    if (req.validationError) {
        reply.code(400).send(errorResponseCreator(400, "Bad Request", "Request is invalid"));
    }

    const {email} = req.user;

    const existedUser = await User.findOne({email});
    if (!existedUser) {
        throw this.httpErrors.badRequest("User is invalid");
    }

    const {name, description, avatarUrl} = existedUser;
    return successResponseCreator(200, "Get profile successfully", {
        name,
        email,
        description,
        avatarUrl,
    });
}

async function updateProfile_user(req, reply) {
    if (req.validationError) {
        reply.code(400).send(errorResponseCreator(400, "Bad Request", "Request is invalid"));
    }

    const {email} = req.user;
    const {name, description, avatarUrl} = req.body;

    const updatedUser = await User.findOneAndUpdate(
        {email},
        {name, description, avatarUrl},
        {
            new: true,
        }
    );
    if (!updatedUser) {
        throw this.httpErrors.badRequest("User is invalid");
    }

    return successResponseCreator(200, "Update profile successfully", {
        name,
        email,
        description,
        avatarUrl,
    });
}

async function changePassword_user(req, reply) {
    if (req.validationError) {
        reply.code(400).send(errorResponseCreator(400, "Bad Request", "Request is invalid"));
    }

    const {email} = req.user;
    const {password, newPassword} = req.body;

    const existedUser = await User.findOne({email});
    if (!existedUser) {
        throw this.httpErrors.badRequest("User is invalid");
    }

    if (password === newPassword) {
        reply
            .code(400)
            .send(
                errorResponseCreator(
                    400,
                    "Bad Request",
                    "New password must different from your current password"
                )
            );
    }

    const isMatchedPassword = await this.bcrypt.compare(password, existedUser.password);
    if (!isMatchedPassword) {
        throw this.httpErrors.badRequest("Password is incorrect");
    }

    const hashedPassword = await this.bcrypt.hash(newPassword);
    existedUser.password = hashedPassword;
    await existedUser.save();

    return successResponseCreator(200, "Change password successfully");
}

module.exports = {
    register_user,
    login_user,
    getProfile_user,
    updateProfile_user,
    changePassword_user,
};
