const teamModel = {
    name: "teams",
    alias: "Team",
    schema: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        users: {
            type: Array,
        },
    },
};

module.exports = teamModel;
