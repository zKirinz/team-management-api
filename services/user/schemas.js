const {responseSchema} = require("../../helpers/response");

const register = {
    body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: {
                type: "string",
            },
            email: {
                type: "string",
            },
            password: {
                type: "string",
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
            },
            description: {
                type: "string",
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
    updateProfile,
    changePassword,
};
