const UserService = require("../controllers/user/services");
const TeamService = require("../controllers/team/services");

const fastifyService = async (fastify) => {
    const userService = new UserService(fastify);
    const teamService = new TeamService(fastify);

    fastify.decorate("userService", userService);
    fastify.decorate("teamService", teamService);
};

module.exports = fastifyService;
