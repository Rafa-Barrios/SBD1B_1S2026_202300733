const oracledb = require('oracledb');
require('dotenv').config();

async function getConnection() {
    const connection = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE}`
    });
    return connection;
}

module.exports = { getConnection };