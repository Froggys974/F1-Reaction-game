const Timer = require('../models/timerModel');

exports.submitReactionTime = async (req, res) => {
    try {
        console.log(req.user);
        
        const newTimer = new Timer({
            user_id: req.body.user_id,
            time: req.body.time
        });

        const timer = await newTimer.save();
        res.status(201).json(timer);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.getReactionTimes = async (req, res) => {
    try {
        const timers = await Timer.find({ user_id: req.params.userId }).sort({ created_at: -1 });
        res.status(200).json(timers);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
