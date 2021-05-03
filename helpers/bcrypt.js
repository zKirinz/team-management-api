const bcrypt = require("bcrypt");

const hashString = async (value) => {
    const round = 10;
    const salt = await bcrypt.genSalt(round);
    return bcrypt.hash(value, salt);
};

const compareString = async (string, hashedString) => {
    return bcrypt.compare(string, hashedString);
};

const fastifyBcrypt = async (fastify) => {
    fastify.decorate("bcrypt", {hash: hashString, compare: compareString});
};

module.exports = {fastifyBcrypt, hashString};
