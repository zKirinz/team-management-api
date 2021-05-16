const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Change Password user /password", () => {
    let db;
    let user1Token, user2Token, user3Token;
    beforeAll(async () => {
        db = await connectMongodb("_changePassword_user");
        await createUsers();
        user1Token = await createTokenUser("test1@test.com");
        user2Token = await createTokenUser("test2@test.com");
        user3Token = await createTokenUser("test3@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token, password, newPassword) => {
        const api = await request();
        return api
            .post(`/api/${process.env.VERSION}/users/password`)
            .set({authorization: token})
            .send({password, newPassword});
    };

    it("should return 200 CHANGE PASSWORD USER succeed", async () => {
        const res = await exec(user1Token, "password", "newPassword");

        expect(res.status).toEqual(200);
    });

    it("should return 400 CHANGE PASSWORD USER fail: body.newPassword should NOT be shorter than 6 characters", async () => {
        const res = await exec(user2Token, "password", "12345");

        expect(res.status).toEqual(400);
    });

    it("should return 400 CHANGE PASSWORD USER fail: body.newPassword should NOT be longer than 30 characters", async () => {
        const res = await exec(user3Token, "password", "1234567891011121314151617181920");

        expect(res.status).toEqual(400);
    });
});
