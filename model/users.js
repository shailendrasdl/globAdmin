const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
		unique: true,
		required: true,
		trim: true
    },
    company_name: {
        type: String
    },
    device_id: {
        type: String,
        unique: true,
    },
    device_type: {
        type: String
    },
    contact_name: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    zip_code: {
        type: String,
    },
    location: {
        type: String,
		required: false
    },
    password: {
        type: String,
        required: false
    },
    profile_image: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    logo_url: {
        type: String,
		required: false
    },
    presentation_url: {
        type: String,
		required: false
    },
    login_time: {
		type: String,
		required: false
    },
    user_type: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    },
    realestate_plan: {
		type: String,
		required: false
    },
    automobile_plan: {
		type: String,
		required: false
    },
    boats_plan: {
		type: String,
		required: false
    },
    globetech_plan: {
		type: String,
		required: false
    },
    globepage_plan: {
		type: String,
		required: false
    },
    
    // forgotten_password_time: {
    //     type: String,
    //     default: 0
    // },
    // active: {
    //     type: Boolean,
    //     default: false
    // },
    // verify_status: {
    //     type: Boolean,
    //     default: false
    // },
    
    created_at: {
        type: String,
    },
    updated_at: {
        type: String
    }
})

module.exports = mongoose.model('Users', UsersSchema);