const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sendemail_listSchema = new Schema({   
	ip_address: {
		type: String,
		required: false
	},
	user_id: {
		type: [String],
		required: false
	},
	user_group: {
		type: String,
		required: false
	},
	admin_id: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	},
	subject: {
		type: String,
		required: false
	},
	message: {
		type: [String],
		required: false
	},
    created_at: {
        type: String
    }
})

module.exports = mongoose.model('Sendemail_list', Sendemail_listSchema)