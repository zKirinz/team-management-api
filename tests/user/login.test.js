const {request, cleanup} = require("../helpers");
const {createUsers} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");

describe("Login user /login", () => {
    let db;
    beforeAll(async () => {
        db = await connectMongodb("_login_user");
        await createUsers();
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (email, password) => {
        const api = await request();
        return api.post(`/api/${process.env.VERSION}/users/login`).send({email, password});
    };

    it("should return 200 LOGIN USER succeed", async () => {
        const res = await exec("test1@test.com", "password");

        expect(res.status).toEqual(200);
    });

    it("should return 404 LOGIN USER fail: Email is not exist", async () => {
        const res = await exec("test4@test.com", "password");

        expect(res.status).toEqual(404);
    });

    it("should return 400 LOGIN USER fail: Password is incorrect", async () => {
        const res = await exec("test1@test.com", "pass");

        expect(res.status).toEqual(400);
    });

    it("should return 400 LOGIN USER fail: Email is invalid", async () => {
        const res = await exec("test1@test", "password");

        expect(res.status).toEqual(400);
    });
});
