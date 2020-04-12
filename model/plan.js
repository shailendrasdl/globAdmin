const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({    
    plan_name: {
        type: String,
        required: true,
        unique : true
    },
    plan_Validity: {
        type: String,
        required: false
    },
    plan_price: {
        type: String,
        required: false
    },
    post_validity: {
        type: String,
        required: false
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

module.exports = mongoose.model('Plan', planSchema);