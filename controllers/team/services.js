const {successResponseCreator} = require("../../helpers/response");

const Team = require("../../models/team");
const User = require("../../models/user");

class TeamService {
    constructor(fastify) {
        this.fastify = fastify;
    }

    async create_team(user, name) {
        const existedTeam = await Team.findOne({name});
        if (existedTeam) {
            throw this.fastify.httpErrors.badRequest("Team is already exists");
        }

        const createdTeam = await Team.create({
            name,
            creator: user._id,
        });
        if (!createdTeam) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        user.teams.push(createdTeam._id);
        const savedUser = await user.save();
        if (!savedUser) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        return successResponseCreator(201, "Create a team successfully", {
            name,
            description: "",
            avatarUrl: "",
        });
    }

    async get_team(teams) {
        return successResponseCreator(200, "Get teams successfully", teams);
    }

    async update_team(teams, name, description, avatarUrl) {
        const team = teams.find((team) => team.name === name);
        if (!team) {
            throw this.fastify.httpErrors.badRequest("Team is not exists");
        }

        team.description = description;
        team.avatarUrl = avatarUrl;
        const savedTeam = await team.save();
        if (!savedTeam) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        return successResponseCreator(200, "Update a team successfully", team);
    }

    async remove_team(user, teams, name) {
        const teamIndex = teams.findIndex((team) => team.name === name);
        if (teamIndex === -1) {
            throw this.fastify.httpErrors.badRequest("Team is not exists");
        }

        const removedTeam = teams[teamIndex];
        teams.splice(teamIndex, 1);
        const savedUser = await user.save();
        if (!savedUser) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        const result = await Team.deleteOne({name});
        if (!result.ok) {
            throw this.fastify.httpErrors.internalServerError("Something went wrong");
        }

        return successResponseCreator(200, "Delete a team successfully", removedTeam);
    }
}

module.exports = TeamService;
