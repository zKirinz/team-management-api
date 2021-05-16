const fp = require("fastify-plugin");

const swaggerOption = {
    routePrefix: `api/${process.env.VERSION}/documentation`,
    openapi: {
        info: {
            title: "Team Management",
            description: "Team Management API documentation",
            termsOfService: "http://swagger.io/terms/",
            contact: {email: "tran123456k@gmail.com"},
            license: {name: "Apache 2.0", url: "http://www.apache.org/licenses/LICENSE-2.0.html"},
            version: "1.0",
        },
        servers: [
            {
                url: `${process.env.BACKEND_URL}/api/${process.env.VERSION}`,
            },
        ],
        externalDocs: {
            url: "https://swagger.io",
            description: "Find out more about Swagger",
        },
        tags: [
            {
                name: "user",
                description: "Operations about user",
                externalDocs: {
                    url: "https://swagger.io",
                    description: "Find out more",
                },
            },
            {
                name: "team",
                description: "Access to Team orders",
                externalDocs: {
                    url: "https://swagger.io",
                    description: "Find out more",
                },
            },
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    required: ["_id", "email", "name", "password"],
                    properties: {
                        _id: {type: "string", example: "5f3d16dcc910b67dd02ed0e5"},
                        email: {type: "string", format: "email"},
                        name: {type: "string"},
                        password: {type: "string"},
                        description: {type: "string"},
                        avatarUrl: {type: "string"},
                        teamId: {
                            type: "array",
                            items: {
                                type: "string",
                                example:
                                    '["5f3d1875087baebfc14d35ab","5f3d18e8f6e4aacc45d1a026","5f3d18ed0b0c27733e9bc597"]',
                            },
                            default: [],
                        },
                    },
                },
                Team: {
                    type: "object",
                    required: ["_id", "name"],
                    properties: {
                        _id: {type: "string", example: "5f3d16dcc910b67dd02ed0e5"},
                        name: {type: "string"},
                        description: {type: "string"},
                        avatarUrl: {type: "string"},
                        isPublished: {type: "boolean"},
                        creatorId: {type: "string", example: "5f3d16dcc910b67dd02ed0e5"},
                        userId: {
                            type: "array",
                            items: {
                                type: "string",
                                example:
                                    '["5f3d1875087baebfc14d35ab","5f3d18e8f6e4aacc45d1a026","5f3d18ed0b0c27733e9bc597"]',
                            },
                            default: [],
                        },
                    },
                },
                ApiResponse: {
                    type: "object",
                    required: ["statusCode", "message"],
                    properties: {
                        statusCode: {type: "number", example: "200"},
                        message: {type: "string", example: "Login successfully"},
                    },
                },
            },
        },
    },
    exposeRoute: true,
    hideUntagged: true,
};

const fastifySwagger = async (fastify) => {
    fastify.register(require("fastify-swagger"), swaggerOption);
};

module.exports = fastifySwagger;
