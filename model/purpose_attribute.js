const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Purpose_attributeSchema = new Schema({    
    purpose: {
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

module.exports = mongoose.model('Purpose_attribute', Purpose_attributeSchema);