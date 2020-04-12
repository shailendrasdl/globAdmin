const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({    
    role_name: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        default: null
    },
	status:{
		type: Boolean,
		default:true
	},
    created_at: {
        type: String,
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model('Role', RoleSchema);
