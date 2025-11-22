const path = require("path");
const { getConnectionOptions, createConnection } = require("typeorm");

module.exports = async () => {
    const defaultOptions = await getConnectionOptions();

    const databasePath = process.env.NODE_ENV === "test"
        ? path.resolve(__dirname, "database.test.sqlite")
        : path.resolve(__dirname, "database.sqlite");

    return createConnection({
        ...defaultOptions,
        database: databasePath,
    });
};
