const userController = require('./user');
const authController = require('./auth');

function initializeRouter(app) {
    app.use('/api/user', userController);
    app.use('/api/auth', authController);
}

module.exports = initializeRouter;