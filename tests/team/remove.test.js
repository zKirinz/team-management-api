const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers, createTeams} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Remove a team /", () => {
    let db;
    let user1Token;
    beforeAll(async () => {
        db = await connectMongodb("_remove_team");
        await createUsers();
        await createTeams();
        user1Token = await createTokenUser("test1@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token, name) => {
        const api = await request();
        return api.delete("/api/teams").set({authorization: token}).send({
            name,
        });
    };

    it("should return 200 DELETE A TEAM succeed", async () => {
        const res = await exec(user1Token, "Front-end");

        expect(res.status).toEqual(200);
    });

    it("should return 400 DELETE A TEAM fail: Team is not exists", async () => {
        const res = await exec(user1Token, "Marketing");

        expect(res.status).toEqual(400);
    });
});
