const {responseSchema} = require("../../helpers/response");

const create = {
    headers: {
        type: "object",
        required: ["authorization"],
        properties: {
            authorization: {
                type: "string",
            },
        },
        additionalProperties: false,
    },
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 30,
            },
        },
        additionalProperties: false,
    },
    response: {
        201: responseSchema,
    },
};

const get = {
    headers: {
        type: "object",
        required: ["authorization"],
        properties: {
            authorization: {
                type: "string",
            },
        },
        additionalProperties: false,
    },
    response: {
        200: responseSchema,
    },
};

const update = {
    headers: {
        type: "object",
        required: ["authorization"],
        properties: {
            authorization: {
                type: "string",
            },
        },
        additionalProperties: false,
    },
    body: {
        type: "object",
        required: ["name", "description", "avatarUrl"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 30,
            },
            description: {
                type: "string",
                maxLength: 300,
            },
            avatarUrl: {
                type: "string",
            },
        },
        additionalProperties: false,
    },
    response: {
        200: responseSchema,
    },
};

const remove = {
    headers: {
        type: "object",
        required: ["authorization"],
        properties: {
            authorization: {
                type: "string",
            },
        },
        additionalProperties: false,
    },
    body: {
        type: "object",
        required: ["name"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 30,
            },
        },
        additionalProperties: false,
    },
    response: {
        200: responseSchema,
    },
};

module.exports = {
    create,
    get,
    update,
    remove,
};
