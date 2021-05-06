const {responseSchema} = require("../../helpers/response");

const MAX_TEAMS = 10;

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
        required: ["name", "isPublished"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 30,
            },
            isPublished: {
                type: "boolean",
            },
        },
        additionalProperties: false,
    },
    response: {
        201: responseSchema,
    },
};

const getAll = {
    query: {
        type: "object",
        properties: {
            limit: {
                type: "number",
                minimum: 3,
                maximum: MAX_TEAMS,
            },
            offset: {
                type: "number",
                minimum: 0,
            },
            name: {
                type: "string",
                maxLength: 30,
            },
            description: {
                type: "string",
                maxLength: 300,
            },
        },
    },
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

const get = {
    query: {
        type: "object",
        properties: {
            limit: {
                type: "number",
                minimum: 3,
                maximum: MAX_TEAMS,
            },
            offset: {
                type: "number",
                minimum: 0,
            },
            name: {
                type: "string",
                maxLength: 30,
            },
            description: {
                type: "string",
                maxLength: 300,
            },
        },
    },
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
        required: ["name", "description", "avatarUrl", "isPublished"],
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
            isPublished: {
                type: "boolean",
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
    getAll,
    update,
    remove,
    MAX_TEAMS,
};
