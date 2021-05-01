const responseSchema = {
    type: "object",
    require: ["statusCode", "message"],
    properties: {
        statusCode: {type: "number"},
        message: {type: "string"},
    },
    additionalProperties: true,
};

const successResponseCreator = (statusCode, message, data) => {
    if (data) {
        return {
            statusCode: statusCode,
            message: message,
            data: data,
        };
    }

    return {
        statusCode: statusCode,
        message: message,
    };
};

const errorResponseCreator = (statusCode, error, message) => {
    return {
        statusCode: statusCode,
        error: error,
        message: message,
    };
};

module.exports = {responseSchema, successResponseCreator, errorResponseCreator};
