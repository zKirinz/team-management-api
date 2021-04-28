const fastify = require("fastify")();
const fs = require("fastify-plugin");

const schema = {
  type: "object",
  required: ["NODE_ENV", "MONGODB_URL"],
  properties: {
    NODE_ENV: {type: "string"},
    MONGODB_URL: {type: "string"},
  },
  additionalProperties: false,
};

module.exports = async (fastify, options) => {
  await fastify
    .register(require("fastify-log"))
    .register(require("fastify-env"), {schema, data: [options]})
    .register(fs(require("./helpers/database")));

  fastify.listen(3000, function (err, address) {
    if (err) {
      fastify.error(err);
      process.exit(1);
    }
    fastify.info(`server listening on ${address}`);
  });
};
