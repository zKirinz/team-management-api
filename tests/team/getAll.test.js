const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers, createTeams} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Get All teams /all", () => {
    let db;
    let user1Token;
    beforeAll(async () => {
        db = await connectMongodb("_getAll_team");
        await createUsers();
        await createTeams();
        user1Token = await createTokenUser("test1@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token) => {
        const api = await request();
        return api.get("/api/teams/all").set({authorization: token});
    };

    it("should return 200 GET ALL TEAMS succeed", async () => {
        const res = await exec(user1Token);

        expect(res.status).toEqual(200);
    });
});
