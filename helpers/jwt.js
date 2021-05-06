const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const verifyUserToken = async (token, httpErrors) => {
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return payload;
    } catch (error) {
        const message =
            error.name === "TokenExpiredError" ? error.message : "Credential is invalid";

        throw httpErrors.unauthorized(message);
    }
};

const bearerTokenParser = async (request, httpErrors) => {
    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.split(" ").length)
        throw httpErrors.unauthorized("Credential is invalid");
    return authHeader.split(" ")[1];
};

const fastifyJWT = async (fastify) => {
    const httpErrors = fastify.httpErrors;

    fastify.decorate("authOnRequest", async (request, reply) => {
        const token = await bearerTokenParser(request, httpErrors);
        const payload = await verifyUserToken(token, httpErrors);

        if (!payload || !payload.email) {
            throw fastify.httpErrors.unauthorized("Credential is invalid");
        }
        const user = await User.findOne({email: payload.email});
        if (!user) throw httpErrors.internalServerError("Credential is invalid");

        request.user = user;
    });

    fastify.decorate("jwt", {sign: getUserToken, verify: verifyUserToken});
};

module.exports = {getUserToken, verifyUserToken, fastifyJWT};
