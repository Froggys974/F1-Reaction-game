const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const timerSchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    time: { 
        type: Number, 
        required: true },
    created_at: { 
        type: Date, 
        default: Date.now }
});

module.exports = mongoose.model('Timer', timerSchema);
