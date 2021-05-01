const codeHasher = async (fastify) => {
    fastify.register(require("fastify-bcrypt"), {
        saltWorkFactor: 12,
    });
};

module.exports = codeHasher;
