module.exports = {
    resolve: {
        fallback: {
            'crypto': false,
            'util': require.resolve("util/"),
            'stream': false,
        },
    },
};
