require("dotenv").config();

module.exports = {
    development: {
        username: "root",
        password: null,
        database: "mysql",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: process.env.SEQUELIZE_USERNAME,
        password: process.env.SEQUELIZE_PASSWORD,
        database: process.env.SEQUELIZE_DATABASE,
        host: process.env.SEQUELIZE_HOST,
        dialect: process.env.SEQUELIZE_DIALECT
    }
}

