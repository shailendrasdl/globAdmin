const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_groupSchema = new Schema({    
    group_name: {
        type: String,
        required: true,
        unique : true
    },
    email: {
		type: [String],
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

module.exports = mongoose.model('User_group', User_groupSchema);