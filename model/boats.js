const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boatsSchema = new Schema({
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
    model: {
        type: String,
        required: false
    },
    currency : {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
    length: {
        type: String,
        required: false,
    },
    width: {
        type: String,
        required: false,
    },
    depth: {
        type: String,
        required: false,
    },
    vat_payed: {
        type: String,
        required: false,
    },
    for: {
        type: String,
        required: false,
    },
    boat_type: {
        type: String,
        required: false,
    },
    power: {
        type: String,
        required: false,
    },
    fuel: {
        type: String,
        required: false,
    },
    water_capacity: {
        type: String,
        required: false,
    },
    no_of_bedrooms: {
        type: String,
        required: false,
    },
    no_of_bathrooms: {
        type: String,
        required: false,
    },
    engine_hours: {
        type: String,
        required: false,
    },
    engine_type: {
        type: String,
        required: false,
    },
    
    no_of_engines: {
        type: String,
        required: false,
    },
    hull_material: {
        type: String,
        required: false,
    },
    color_hull: {
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
module.exports = mongoose.model('Boats', boatsSchema);