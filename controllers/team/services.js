const {successResponseCreator} = require("../../helpers/response");

const Team = require("../../models/team");
const User = require("../../models/user");

const {MAX_TEAMS} = require("./schemas");

class TeamService {
    constructor(fastify) {
        this.fastify = fastify;
    }

    async create_team(user, teams, name, isPublished) {
        if (teams.length > MAX_TEAMS) {
            throw this.fastify.httpErrors.badRequest(
                `A User cannot have more than ${MAX_TEAMS} teams`
            );
        }

        const existedTeam = await Team.findOne({name});
        if (existedTeam) {
            throw this.fastify.httpErrors.badRequest("Team's name is already exists");
        }

        const createdTeam = await Team.create({
            name,
            isPublished,
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
            isPublished,
        });
    }

    async getAll_team(limit, offset, name, description) {
        let filteredTeams = await Team.find({isPublished: true});

        if (filteredTeams.length === 0) {
            return successResponseCreator(201, "Get teams successfully", []);
        }

        if (name) {
            filteredTeams = filteredTeams.filter((team) => team.name.includes(name));
        }

        if (description) {
            filteredTeams = filteredTeams.filter((team) => team.description.includes(description));
        }

        if (offset * limit + 1 > filteredTeams.length) {
            throw this.fastify.httpErrors.badRequest("Offset is not exists");
        }
        const paginationTeams = filteredTeams.slice(offset * limit, (offset + 1) * limit);

        return successResponseCreator(200, "Get teams successfully", paginationTeams);
    }

    async get_team(teams, limit, offset, name, description) {
        let filteredTeams = teams;

        if (filteredTeams.length === 0) {
            return successResponseCreator(201, "Get teams successfully", []);
        }

        if (name) {
            filteredTeams = filteredTeams.filter((team) => team.name.includes(name));
        }

        if (description) {
            filteredTeams = filteredTeams.filter((team) => team.description.includes(description));
        }

        if (offset * limit + 1 > filteredTeams.length) {
            throw this.fastify.httpErrors.badRequest("Offset is not exists");
        }
        const paginationTeams = filteredTeams.slice(offset * limit, (offset + 1) * limit);

        return successResponseCreator(200, "Get teams successfully", paginationTeams);
    }

    async update_team(teams, name, description, avatarUrl, isPublished) {
        const team = teams.find((team) => team.name === name);
        if (!team) {
            throw this.fastify.httpErrors.badRequest("Team is not exists");
        }

        team.description = description;
        team.avatarUrl = avatarUrl;
        team.isPublished = isPublished;
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
