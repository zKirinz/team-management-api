const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserToken = (payload) => {
    const options = {
        expiresIn: 60 * 60,
        issuer: process.env.BACKEND_URL,
        audience: process.env.BACKEND_URL,
    };

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
};

const verifyUserToken = async (token, httpErrors) => {
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return payload;
    } catch (error) {
        console.log(error);
        throw httpErrors.unauthorized("Credential is invalid");
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
