const db = require('../utils').db;

const user = require('./user');

async function sync() {
    try {
        if (process.env.UPDATE_DB === 'true') {
            await db.connection.sync({
                alter: true,
                force: false
            });
        }

        console.log('Models synced');
    } catch (error) {
        console.log('Unable to sync models');
        throw error;
    }
};

module.exports = {
    sync,
    user
}