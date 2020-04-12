const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({    
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    validity: {
        type: String,
        required: true
    },
    
    time_duration: {
        type: String,
        required: true
    },
    price_video: {
        type: String,
        required: true
    },
    price_10_video: {
        type: String,
        required: true
    },
    price_20_video: {
        type: String,
        required: true
    },
    price_50_video: {
        type: String,
        required: true
    },
    status: {
		type: Boolean,
		default: false
	},
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model('Subscription', subscriptionSchema);