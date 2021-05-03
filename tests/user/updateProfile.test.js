const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Update Profile user /me", () => {
    let db;
    let user1Token;
    beforeAll(async () => {
        db = await connectMongodb("_updateProfile_user");
        await createUsers();
        user1Token = await createTokenUser("test1@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token, name, description, avatarUrl) => {
        const api = await request();
        return api
            .post("/api/users/me")
            .set({authorization: token})
            .send({name, description, avatarUrl});
    };

    it("should return 200 UPDATE PROFILE USER succeed", async () => {
        const res = await exec(
            user1Token,
            "Updated User 1",
            "Updated Content 1",
            "updatedtest1.com"
        );

        expect(res.status).toEqual(200);
    });

    it("should return 400 UPDATE PROFILE USER fail: body.name should NOT be shorter than 3 characters", async () => {
        const res = await exec(user1Token, "Us", "Updated Content 1", "updatedtest1.com");

        expect(res.status).toEqual(400);
    });

    it("should return 400 UPDATE PROFILE USER fail: body.name should NOT be longer than 30 characters", async () => {
        const res = await exec(
            user1Token,
            "Updated User 1 Updated User 1 Updated User 1",
            "Updated Content 1",
            "updatedtest1.com"
        );

        expect(res.status).toEqual(400);
    });
});
