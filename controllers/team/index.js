const {
    create: createSchema,
    get: getSchema,
    getAll: getAllSchema,
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
        fastify.get("/all", {schema: getAllSchema}, getAllTeamsHandler);
        fastify.get("/", {schema: getSchema}, getTeamsHandler);
        fastify.put("/", {schema: updateSchema}, updateTeamHandler);
        fastify.delete("/", {schema: removeSchema}, removeTeamHandler);
    });
};

async function createTeamHandler(request, reply) {
    const {user} = request;
    const {teams} = request;
    const {name, isPublished} = request.body;
    return this.teamService.create_team(user, teams, name, isPublished);
}

async function getAllTeamsHandler(request, reply) {
    const {limit, offset, name, description} = request.query;
    return this.teamService.getAll_team(limit, offset, name, description);
}

async function getTeamsHandler(request, reply) {
    const {teams} = request;
    const {limit, offset, name, description} = request.query;
    return this.teamService.get_team(teams, limit, offset, name, description);
}

async function updateTeamHandler(request, reply) {
    const {teams} = request;
    const {name, description, avatarUrl, isPublished} = request.body;
    return this.teamService.update_team(teams, name, description, avatarUrl, isPublished);
}

async function removeTeamHandler(request, reply) {
    const {user} = request;
    const {teams} = request;
    const {name} = request.body;
    return this.teamService.remove_team(user, teams, name);
}
