const {request, cleanup, createTokenUser} = require("../helpers");
const {createUsers, createTeams} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");
const {MAX_TEAMS} = require("../../controllers/team/schemas");

describe("Create a team /", () => {
    let db;
    let user1Token;
    let user2Token;
    beforeAll(async () => {
        db = await connectMongodb("_create_team");
        await createUsers();
        await createTeams();
        user1Token = await createTokenUser("test1@test.com");
        user2Token = await createTokenUser("test2@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token, name, isPublished) => {
        const api = await request();
        return api
            .post(`/api/${process.env.VERSION}/teams`)
            .set({authorization: token})
            .send({name, isPublished});
    };

    it("should return 201 CREATE A TEAM succeed", async () => {
        const res = await exec(user1Token, "Internet of things", true);

        expect(res.status).toEqual(201);
    });

    it(`should return 400 CREATE A TEAM fail: A User cannot have more than ${MAX_TEAMS} teams`, async () => {
        const res = await exec(user2Token, "English", true);

        expect(res.status).toEqual(400);
    });

    it("should return 400 CREATE A TEAM fail: Team's name is already exists", async () => {
        const res = await exec(user1Token, "Front-end", true);

        expect(res.status).toEqual(400);
    });

    it("should return 400 CREATE A TEAM fail: body.name should NOT be shorter than 3 characters", async () => {
        const res = await exec(user1Token, "FE", true);

        expect(res.status).toEqual(400);
    });

    it("should return 400 CREATE A TEAM fail: body.name should NOT be longer than 30 characters", async () => {
        const res = await exec(user1Token, "Data Structures and Algorithms ", true);

        expect(res.status).toEqual(400);
    });
});
