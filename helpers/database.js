const mongoose = require("mongoose");

const connectMongodb = async (postfix = "") => {
    const db = await mongoose.connect(
        process.env.MONGODB_URL + "/" + process.env.MONGODB_NAME + postfix,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    );
    return db.connection;
};

const fastifyMongoose = async (fastify) => {
    if (process.env.NODE_ENV === "test") {
        return;
    }

    try {
        const db = await connectMongodb();
        console.log("Connect to database successfully");
        fastify.decorate("db", db);
    } catch (error) {
        console.log("Mongodb starting error: ", error);
    }
};

module.exports = {fastifyMongoose, connectMongodb};
