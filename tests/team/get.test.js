const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers, createTeams} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");
const {MAX_TEAMS, MIN_TEAMS} = require("../../controllers/team/schemas");

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
        if (typeof limit === "number") queryParams.limit = limit;
        if (typeof offset === "number") queryParams.offset = offset;

        const api = await request();
        return api
            .get(`/api/${process.env.VERSION}/teams`)
            .query(queryParams)
            .set({authorization: token});
    };

    it("should return 200 GET TEAMS succeed with no limit and no offset and no search", async () => {
        const res = await exec(user2Token);

        expect(res.status).toEqual(200);
    });

    it("should return 200 GET TEAMS succeed with search and limit and no offset", async () => {
        const res = await exec(user2Token, "o", 5);

        expect(res.status).toEqual(200);
    });

    it("should return 200 GET TEAMS succeed with search and offset and no limit", async () => {
        const res = await exec(user2Token, "o", "", 0);

        expect(res.status).toEqual(200);
    });

    it("should return 200 GET TEAMS succeed with limit and offset and no search", async () => {
        const res = await exec(user2Token, "", 5, 0);

        expect(res.status).toEqual(200);
    });

    it(`should return 400 GET TEAMS fail: querystring.limit should be >= ${MIN_TEAMS}`, async () => {
        const res = await exec(user2Token, "", MIN_TEAMS - 1, 0);

        expect(res.status).toEqual(400);
    });

    it(`should return 400 GET TEAMS fail: querystring.limit should be <= ${MAX_TEAMS}`, async () => {
        const res = await exec(user2Token, "", MAX_TEAMS + 1, 0);

        expect(res.status).toEqual(400);
    });

    it("should return 400 GET TEAMS fail: Offset is not exists", async () => {
        const res = await exec(user2Token, "o", 3, 2);

        expect(res.status).toEqual(400);
    });
});
