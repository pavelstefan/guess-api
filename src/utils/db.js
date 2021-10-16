const { Sequelize } = require('sequelize');

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

let connection = new Sequelize(dbName, username, password, {
    host,
    dialect: 'postgres'
});

async function initializeDbConnection() {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
      }
}

module.exports = {
    connection,
    initializeDbConnection
};