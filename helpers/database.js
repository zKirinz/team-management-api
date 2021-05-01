const mongoose = require("mongoose");

const databaseConnector = async (fastify) => {
    await mongoose.connect(fastify.config.MONGODB_URL + "/" + fastify.config.MONGODB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log("Connect to database successfully");
};

module.exports = databaseConnector;
