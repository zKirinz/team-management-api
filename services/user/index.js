const {
    login: loginSchema,
    register: registerSchema,
    getProfile: getProfileSchema,
    updateProfile: updateProfileSchema,
    changePassword: changePasswordSchema,
} = require("./schemas");
const {
    register_user,
    login_user,
    getProfile_user,
    updateProfile_user,
    changePassword_user,
} = require("./service");

module.exports = async function (fastify, options) {
    fastify.post("/login", {schema: loginSchema, attachValidation: true}, login_user);
    fastify.post("/register", {schema: registerSchema, attachValidation: true}, register_user);

    fastify.register(async function (fastify) {
        fastify.addHook("onRequest", fastify.authOnRequest);
        fastify.get("/me", {schema: getProfileSchema, attachValidation: true}, getProfile_user);
        fastify.post(
            "/me",
            {schema: updateProfileSchema, attachValidation: true},
            updateProfile_user
        );
        fastify.post(
            "/password",
            {schema: changePasswordSchema, attachValidation: true},
            changePassword_user
        );
    });
};
