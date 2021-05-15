const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");
const {MIN_USERS, MAX_USERS} = require("../../controllers/user/schemas");

describe("Get users /", () => {
    let db;
    let user1Token;
    beforeAll(async () => {
        db = await connectMongodb("_get_user");
        await createUsers();
        user1Token = await createTokenUser("test1@test.com");
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
        return api.get("/api/users").query(queryParams).set({authorization: token});
    };

    it("should return 200 GET USER succeed with no limit and no offset and no search", async () => {
        const res = await exec(user1Token);

        expect(res.status).toEqual(200);
    });

    it("should return 200 GET USER succeed with search and limit and no offset", async () => {
        const res = await exec(user1Token, "1", 5);

        expect(res.status).toEqual(200);
    });

    it("should return 200 GET USER succeed with search and offset and no limit", async () => {
        const res = await exec(user1Token, "o", "", 0);

        expect(res.status).toEqual(200);
    });

    it("should return 200 GET ALL succeed with limit and offset and no search", async () => {
        const res = await exec(user1Token, "", 5, 0);

        expect(res.status).toEqual(200);
    });

    it(`should return 400 GET USERS fail: querystring.limit should be >= ${MIN_USERS}`, async () => {
        const res = await exec(user1Token, "", MIN_USERS - 1, 0);

        expect(res.status).toEqual(400);
    });

    it(`should return 400 GET USERS fail: querystring.limit should be <= ${MAX_USERS}`, async () => {
        const res = await exec(user1Token, "", MAX_USERS + 1, 0);

        expect(res.status).toEqual(400);
    });
});
