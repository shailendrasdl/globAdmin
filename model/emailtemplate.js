const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailtemplateSchema = new Schema({   
	ip_address: {
		type: String,
		required: false
	},
	admin_id: {
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

module.exports = mongoose.model('Emailtemplate', EmailtemplateSchema)