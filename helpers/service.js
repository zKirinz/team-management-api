const UserService = require("../controllers/user/service");

const fastifyService = async (fastify) => {
    const userService = new UserService(fastify);
    fastify.decorate("userService", userService);
};

module.exports = fastifyService;
