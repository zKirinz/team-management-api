const connectToDatabases = async (fastify) => {
  fastify.register(require("fastify-mongodb"), {
    url: fastify.config.MONGODB_URL + "/" + fastify.config.MONGODB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabases;
