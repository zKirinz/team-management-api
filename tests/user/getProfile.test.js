const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Get Profile user /me", () => {
    let db;
    let user1Token;
    beforeAll(async () => {
        db = await connectMongodb("_getProfile_user");
        await createUsers();
        user1Token = await createTokenUser("test1@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token) => {
        const api = await request();
        return api.get("/api/users/me").set({authorization: token});
    };

    it("should return 200 GET PROFILE USER succeed", async () => {
        const res = await exec(user1Token);

        expect(res.status).toEqual(200);
    });
});
