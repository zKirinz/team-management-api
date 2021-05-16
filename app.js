const fastify = require("fastify");
const fp = require("fastify-plugin");

const app = fastify();

app.register(require("./helpers/swagger"))
    .register(require("fastify-cors"), {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
    .register(require("fastify-sensible"))
    .register(fp(require("./helpers/database")["fastifyMongoose"]))
    .register(fp(require("./helpers/bcrypt")["fastifyBcrypt"]))
    .register(fp(require("./helpers/jwt")["fastifyJWT"]))
    .register(fp(require("./helpers/service")))
    .register(require("./controllers/user"), {prefix: `/api/${process.env.VERSION}/users`})
    .register(require("./controllers/team"), {prefix: `/api/${process.env.VERSION}/teams`});

module.exports = app;
