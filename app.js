const fastify = require("fastify");
const fp = require("fastify-plugin");

const app = fastify();

app.register(require("fastify-sensible"))
    .register(fp(require("./helpers/database")["fastifyMongoose"]))
    .register(fp(require("./helpers/bcrypt")["fastifyBcrypt"]))
    .register(fp(require("./helpers/jwt")["fastifyJWT"]))
    .register(fp(require("./helpers/service")))
    .register(require("./controllers/user"), {prefix: "/api/users"});

module.exports = app;
