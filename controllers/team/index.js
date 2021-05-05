const {
    create: createSchema,
    get: getSchema,
    getByName: getByNameSchema,
    update: updateSchema,
    remove: removeSchema,
} = require("./schemas");

module.exports = async (fastify) => {
    fastify.register(async (fastify) => {
        fastify.addHook("onRequest", fastify.authOnRequest);
        fastify.addHook("onRequest", async (request, reply) => {
            const user = request.user;
            const populatedUser = await user.populate("teams").execPopulate();
            const {teams} = populatedUser;
            if (user.teams.length !== teams.length) {
                throw fastify.httpErrors.internalServerError("Something went wrong");
            }

            request.teams = teams;
        });
        fastify.post("/", {schema: createSchema}, createTeamHandler);
        fastify.get("/", {schema: getSchema}, getTeamsHandler);
        fastify.put("/", {schema: updateSchema}, updateTeamHandler);
        fastify.delete("/", {schema: removeSchema}, removeTeamHandler);
    });
};

async function createTeamHandler(request, reply) {
    const {user} = request;
    const {name} = request.body;
    return this.teamService.create_team(user, name);
}

async function getTeamsHandler(request, reply) {
    const {teams} = request;
    return this.teamService.get_team(teams);
}

async function updateTeamHandler(request, reply) {
    const {teams} = request;
    const {name, description, avatarUrl} = request.body;
    return this.teamService.update_team(teams, name, description, avatarUrl);
}

async function removeTeamHandler(request, reply) {
    const {user} = request;
    const {teams} = request;
    const {name} = request.body;
    return this.teamService.remove_team(user, teams, name);
}
