require("fastify")();
const fp = require("fastify-plugin");

const schema = {
    type: "object",
    required: ["NODE_ENV", "MONGODB_URL", "MONGODB_NAME", "JWT_SECRET"],
    properties: {
        NODE_ENV: {type: "string"},
        MONGODB_URL: {type: "string"},
        MONGODB_NAME: {type: "string"},
        JWT_SECRET: {type: "string"},
    },
    additionalProperties: false,
};

const decorateFastifyInstance = async (fastify) => {
    fastify.decorate("authOnRequest", async (request, reply) => {
        request.jwtVerify();
    });
};

module.exports = async (fastify, options) => {
    await fastify
        .register(require("fastify-log"))
        .register(require("fastify-env"), {schema, data: [options]})
        .register(require("fastify-sensible"))
        .register(fp(require("./helpers/database")))
        .register(fp(require("./helpers/bcrypt")))
        .register(fp(require("./helpers/jwt")))
        .register(fp(decorateFastifyInstance))
        .register(require("./services/user"), {prefix: "/api/user"});

    fastify.listen(3000, function (err, address) {
        if (err) {
            fastify.error(err);
            process.exit(1);
        }
        fastify.info(`server listening on ${address}`);
    });

    return fastify;
};
