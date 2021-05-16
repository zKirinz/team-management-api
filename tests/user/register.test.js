const {request, cleanup} = require("../helpers");
const {createUsers} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Register user /register", () => {
    let db;
    beforeAll(async () => {
        db = await connectMongodb("_register_user");
        await createUsers();
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (name, email, password) => {
        const api = await request();
        return api.post(`/api/${process.env.VERSION}/users/register`).send({name, email, password});
    };

    it("should return 201 REGISTER USER succeed", async () => {
        const res = await exec("User 4", "test4@test.com", "password");

        expect(res.status).toEqual(201);
    });

    it("should return 400 REGISTER USER fail: Email is already exists", async () => {
        const res = await exec("User 1", "test1@test.com", "password");

        expect(res.status).toEqual(400);
    });

    it("should return 400 REGISTER USER fail: body.name should NOT be shorter than 3 characters", async () => {
        const res = await exec("Us", "test5@test.com", "password");

        expect(res.status).toEqual(400);
    });

    it("should return 400 REGISTER USER fail: body.name should NOT be longer than 30 characters", async () => {
        const res = await exec("User 1 User 1 User 1 User 1 User 1", "test5@test.com", "password");

        expect(res.status).toEqual(400);
    });

    it("should return 400 REGISTER USER fail: Email is invalid", async () => {
        const res = await exec("User 5", "test5@test", "password");

        expect(res.status).toEqual(400);
    });

    it("should return 400 REGISTER USER fail: body.password should NOT be shorter than 6 characters", async () => {
        const res = await exec("User 5", "test5@test.com", "passw");

        expect(res.status).toEqual(400);
    });

    it("should return 400 REGISTER USER fail: body.password should NOT be longer than 30 characters", async () => {
        const res = await exec("User 5", "test5@test.com", "1234567891011121314151617181920");

        expect(res.status).toEqual(400);
    });
});
