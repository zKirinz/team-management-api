const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers, createTeams} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Get teams /", () => {
    let db;
    let user2Token;
    beforeAll(async () => {
        db = await connectMongodb("_get_team");
        await createUsers();
        await createTeams();
        user2Token = await createTokenUser("test2@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token, search = "", limit = "", offset = "") => {
        const queryParams = {};
        if (search) queryParams.search = search;
        if (limit) queryParams.limit = limit;
        if (offset) queryParams.offset = offset;

        const api = await request();
        return api.get("/api/teams").query(queryParams).set({authorization: token});
    };

    it("should return 200 GET TEAMS succeed", async () => {
        const res = await exec(user2Token);

        expect(res.status).toEqual(200);
    });

    it("should return 400 GET TEAMS fail: Offset is not exists", async () => {
        const res = await exec(user2Token, "o", 3, 2);

        expect(res.status).toEqual(400);
    });
});
