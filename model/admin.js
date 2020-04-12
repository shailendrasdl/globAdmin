const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
		unique: true,
		required: true,
		trim: true
    },
    email: {
        type: String,
		unique: true,
		required: true,
		trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
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

module.exports = mongoose.model('Admin', AdminSchema)