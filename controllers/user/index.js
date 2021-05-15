const {
    login: loginSchema,
    register: registerSchema,
    getProfile: getProfileSchema,
    get: getSchema,
    updateProfile: updateProfileSchema,
    changePassword: changePasswordSchema,
} = require("./schemas");

module.exports = async (fastify) => {
    fastify.post("/register", {schema: registerSchema}, registerHandler);
    fastify.post("/login", {schema: loginSchema}, loginHandler);

    fastify.register(async (fastify) => {
        fastify.addHook("onRequest", fastify.authOnRequest);
        fastify.get("/me", {schema: getProfileSchema}, getProfileHandler);
        fastify.get("/", {schema: getSchema}, getHandler);
        fastify.post("/me", {schema: updateProfileSchema}, updateProfileHandler);
        fastify.post("/password", {schema: changePasswordSchema}, changePasswordHandler);
    });
};

async function registerHandler(request, reply) {
    const {name, email, password} = request.body;
    reply.code(201);
    return this.userService.register_user(name, email, password);
}

async function loginHandler(request, reply) {
    const {email, password} = request.body;
    return this.userService.login_user(email, password);
}

async function getProfileHandler(request, reply) {
    const {user} = request;
    return this.userService.getProfile_user(user);
}

async function getHandler(request, reply) {
    const {limit, offset} = request.query;
    let {search} = request.query;
    search = search ? search.trim() : search;
    return this.userService.get_user(limit, offset, search);
}

async function updateProfileHandler(request, reply) {
    const {user} = request;
    const {name, description, avatarUrl} = request.body;
    return this.userService.updateProfile_user(user, name, description, avatarUrl);
}

async function changePasswordHandler(request, reply) {
    const {user} = request;
    const {password, newPassword} = request.body;
    return this.userService.changePassword_user(user, password, newPassword);
}
