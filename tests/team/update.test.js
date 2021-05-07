const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers, createTeams} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Update a team /", () => {
    let db;
    let user1Token;
    beforeAll(async () => {
        db = await connectMongodb("_update_team");
        await createUsers();
        await createTeams();
        user1Token = await createTokenUser("test1@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token, name, description, avatarUrl, isPublished) => {
        const api = await request();
        return api.put("/api/teams").set({authorization: token}).send({
            name,
            description,
            avatarUrl,
            isPublished,
        });
    };

    it("should return 200 UPDATE A TEAM succeed", async () => {
        const res = await exec(
            user1Token,
            "Front-end",
            "A group for learning ReactJS",
            "pornhub.com",
            false
        );

        expect(res.status).toEqual(200);
    });

    it("should return 400 UPDATE A TEAM fail: Team is not exists", async () => {
        const res = await exec(
            user1Token,
            "Marketing",
            "A group for learning Digital Marketing",
            "pornhub.com",
            true
        );

        expect(res.status).toEqual(400);
    });
});
