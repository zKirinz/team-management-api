const {request, cleanup, createTokenUser, getUser} = require("../helpers");
const {createUsers, createTeams} = require("../seeders");
const {connectMongodb} = require("../../helpers/database");
const {MAX_TEAMS} = require("../../controllers/team/schemas");

describe("Add a user to a team /addUser", () => {
    let db;
    let user1Token;
    let user2Token;
    let user1;
    let user2;
    beforeAll(async () => {
        db = await connectMongodb("_addUser_team");
        await createUsers();
        await createTeams();
        user1Token = await createTokenUser("test1@test.com");
        user2Token = await createTokenUser("test2@test.com");
        user1 = await getUser("test1@test.com");
        user2 = await getUser("test2@test.com");
    });
    afterAll(async () => {
        await cleanup(db);
    });

    const exec = async (token, name, id) => {
        const api = await request();
        return api
            .post(`/api/${process.env.VERSION}/teams/addUser`)
            .set({authorization: token})
            .send({name, id});
    };

    it("should return 200 ADD A USER succeed", async () => {
        const res = await exec(user1Token, "Front-end", user2._id.toString());

        expect(res.status).toEqual(200);
    });

    it("should return 400 ADD A USER fail: User is the admin of the team", async () => {
        const res = await exec(user1Token, "Front-end", user1._id.toString());

        expect(res.status).toEqual(400);
    });

    it("should return 400 ADD A USER fail: Team is not exists", async () => {
        const res = await exec(user1Token, "Back-end", user1._id.toString());

        expect(res.status).toEqual(400);
    });

    it("should return 400 ADD A USER fail: UserId is invalid", async () => {
        const res = await exec(user1Token, "Front-end", "fake userId");

        expect(res.status).toEqual(400);
    });

    it("should return 400 ADD A USER fail: User is not exists", async () => {
        const res = await exec(user1Token, "Front-end", "609370ab9e94123154f4f3c5");

        expect(res.status).toEqual(400);
    });

    it("should return 400 ADD A USER fail: User is already in the team", async () => {
        const res = await exec(user1Token, "Front-end", user2._id.toString());

        expect(res.status).toEqual(400);
    });

    it("should return 400 ADD A USER fail: body.name should NOT be shorter than 3 characters", async () => {
        const res = await exec(user1Token, "FE", user1._id.toString());

        expect(res.status).toEqual(400);
    });

    it("should return 400 ADD A USER fail: body.name should NOT be longer than 30 characters", async () => {
        const res = await exec(user1Token, "Data Structures and Algorithms ", user1._id.toString());

        expect(res.status).toEqual(400);
    });
});
