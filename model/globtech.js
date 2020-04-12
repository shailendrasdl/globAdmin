const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const globtechSchema = new Schema({
    user_id: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    base64_video: {
        type: String,
        required: false
    },
    display_contact: {
        type: [String],
        required: false
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false
    },
    keywords: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    make: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false
    },
    payment_status: {
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
module.exports = mongoose.model('Globtech', globtechSchema);