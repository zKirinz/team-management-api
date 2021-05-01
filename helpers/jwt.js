const authenticator = async (fastify) => {
    fastify.register(require("fastify-jwt"), {
        secret: fastify.config.JWT_SECRET,
        algorithms: ["RS256"],
        messages: {
            authorizationTokenInvalid: (error) => {
                console.log(error);
                return "Credential is invalid";
            },
        },
    });
};

module.exports = authenticator;
