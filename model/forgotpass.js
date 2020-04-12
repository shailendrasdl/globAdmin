const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForgotpasswordSchema = new Schema({   
    email: {
        type: String,
		required: true,
		trim: true
    },
	user_id: {
		type: String,
		required: false
	},
	to_time: {
		type: String,
		required: false
	},
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model('Forgotpass', ForgotpasswordSchema)