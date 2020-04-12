const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Space_attributeSchema = new Schema({    
    name: {
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

module.exports = mongoose.model('Space_attribute', Space_attributeSchema);