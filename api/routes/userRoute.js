module.exports = (server) => {
    const userController = require('../controllers/userController');

    server.route('/users/register')
    .post(userController.userRegister);
    server.route('/users/login')
    .post(userController.userLogin);
};
