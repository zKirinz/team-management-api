const {responseSchema} = require("../../helpers/response");

const MAX_TEAMS = 6;
const MIN_TEAMS = 3;

const create = {
    tags: ["team"],
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
    tags: ["team"],
    query: {
        type: "object",
        properties: {
            limit: {
                type: "number",
                minimum: MIN_TEAMS,
                maximum: MAX_TEAMS,
            },
            offset: {
                type: "number",
                minimum: 0,
            },
            search: {
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
    tags: ["team"],
    query: {
        type: "object",
        properties: {
            limit: {
                type: "number",
                minimum: MIN_TEAMS,
                maximum: MAX_TEAMS,
            },
            offset: {
                type: "number",
                minimum: 0,
            },
            search: {
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
    tags: ["team"],
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
    tags: ["team"],
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

const addUser = {
    tags: ["team"],
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
        required: ["name", "id"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 30,
            },
            id: {
                type: "string",
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
    addUser,
    MAX_TEAMS,
    MIN_TEAMS,
};
