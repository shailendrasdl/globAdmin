const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realestateSchema = new Schema({   
    user_id: {
		type: String, required: false
    },
    video_url: {
        type: String, required: false
    },
    display_contact: {
		type: [String],
		required: false
	},
    category: {
        type: String, required: false
    },
    name: {
        type: String, required: false
    },
    mobile: {
        type: String, required: false
    },
    email: {
        type: String, required: true
    },
    keywords: {
        type: String, required: false
    },
    description: {
        type: String, required: false
    },
    address: {
        type: String, required: false
    },
    address_lat: {
        type: String, required: false
    },
    address_long: {
        type: String, required: false
    },
    type: {
        type: String, required: false
    },
    purpose: {
        type: String, required: false
    },
    time_of_avaliability: {
        type: String, required: false
    },
    type_of_space: {
        type: String, required: false
    },
    square_feet: {
        type: String, required: false
    },
    location: {
        type: String, required: false
    },
    no_of_bathrooms: {
        type: String, required: false
    },
    no_of_bedrooms: {
        type: String, required: false
    },
    residential_or_holiday: {
        type: String, required: false
    },
    condition: {
        type: String, required: false
    },
    garage_included: {
        type: String, required: false
    },
    lift: {
        type: String, required: false
    },
    currency : {
        type: String, required: false
    },
    price: {
        type: String, required: false,
    },
    rent_price: {
        type: String, required: false
    },
    monthly_charges: {
        type: String, required: false
    },
    level: {
        type: String, required: false
    },
    amenities: {
        type: String, required: false
    },
    payment_status: {
        type: Boolean, default: false
	},
	status: {
		type: Boolean, default: false
	},
    created_at: { type: String },
    updated_at: { type: String }
})

module.exports = mongoose.model('Realestate', realestateSchema);