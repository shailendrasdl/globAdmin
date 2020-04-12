const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_planSchema = new Schema({    
    user_id: {
        type: String,
        required: true
    },
    subscription_id: {
        type: String,
        required: true
    },
    subscription_name: {
        type: String,
        required: true
    },
    subscription_Validity: {
        type: String,
        required: false
    },
    subscription_price: {
        type: String,
        required: false
	},
    subscription_details: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    contact_name: {
        type: String
    },
    payment_status: {
		type: Boolean,
		default: false
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

module.exports = mongoose.model('User_plan', User_planSchema);