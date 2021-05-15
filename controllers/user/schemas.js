const {responseSchema} = require("../../helpers/response");

const MAX_USERS = 20;
const MIN_USERS = 3;

const register = {
    body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 30,
            },
            email: {
                type: "string",
            },
            password: {
                type: "string",
                minLength: 6,
                maxLength: 30,
            },
        },
        additionalProperties: false,
    },
    response: {
        201: responseSchema,
    },
};

const login = {
    body: {
        type: "object",
        require: ["email", "password"],
        properties: {
            email: {type: "string"},
            password: {type: "string"},
        },
        additionalProperties: false,
    },
    response: {
        200: responseSchema,
    },
};

const getProfile = {
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
                minimum: MIN_USERS,
                maximum: MAX_USERS,
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

const updateProfile = {
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

const changePassword = {
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
        required: ["password", "newPassword"],
        properties: {
            password: {
                type: "string",
            },
            newPassword: {
                type: "string",
                minLength: 6,
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
    register,
    login,
    getProfile,
    get,
    updateProfile,
    changePassword,
    MIN_USERS,
    MAX_USERS,
};
