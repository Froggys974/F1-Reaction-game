module.exports = (server) => {
    const timerController = require('../controllers/timerController');
    const { authenticateToken } = require('../middlewares/jwtMiddleware');

    server.route('/submit-reaction-time')
    .post(timerController.submitReactionTime);
    server.route('/get-reaction-times/:userId')
    .get(timerController.getReactionTimes);
};
