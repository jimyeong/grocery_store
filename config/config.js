require("dotenv").config();
const keys = require("./keys");
module.exports = {
    development: {
        username: keys.DB_USERNAME,
        password: keys.DB_PASSWORD,
        database: keys.DB_NAME,
        host: keys.DB_HOST,
        dialect: keys.DB
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: keys.DB_USERNAME,
        password: keys.DB_PASSWORD,
        database: keys.DB_NAME,
        host: keys.DB_HOST,
        dialect: keys.DB
    }
}

