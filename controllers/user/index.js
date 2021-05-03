const {
    login: loginSchema,
    register: registerSchema,
    getProfile: getProfileSchema,
    updateProfile: updateProfileSchema,
    changePassword: changePasswordSchema,
} = require("./schemas");

module.exports = async (fastify) => {
    fastify.post("/register", {schema: registerSchema}, registerHandler);
    fastify.post("/login", {schema: loginSchema}, loginHandler);

    fastify.register(async function (fastify) {
        fastify.addHook("onRequest", fastify.authOnRequest);
        fastify.get("/me", {schema: getProfileSchema}, getProfileHandler);
        fastify.post("/me", {schema: updateProfileSchema}, updateProfileHandler);
        fastify.post("/password", {schema: changePasswordSchema}, changePasswordHandler);
    });
};

async function registerHandler(req, reply) {
    const {name, email, password} = req.body;
    reply.code(201);
    return await this.userService.register_user(name, email, password);
}

async function loginHandler(req, reply) {
    const {email, password} = req.body;
    return await this.userService.login_user(email, password);
}

async function getProfileHandler(req, reply) {
    const {user} = req;
    return await this.userService.getProfile_user(user);
}

async function updateProfileHandler(req, reply) {
    const {user} = req;
    const {name, description, avatarUrl} = req.body;
    return await this.userService.updateProfile_user(user, name, description, avatarUrl);
}

async function changePasswordHandler(req, reply) {
    const {user} = req;
    const {password, newPassword} = req.body;
    console.log(password, newPassword);
    return await this.userService.changePassword_user(user, password, newPassword);
}
