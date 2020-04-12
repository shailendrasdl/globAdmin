const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const automobileSchema = new Schema({
    user_id: {
        type: String,
        required: false
    },
    base64_video: {
        type: String,
        required: false
    },
    display_contact: {
        type: [String],
        required: false
    },
    category: {
        type: String,
        required: true
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
    variant: {
        type: String,
        required: false
    },
    engine: {
        type: String,
        required: false
    },
    horse_power: {
        type: String,
        required: false
    },
    mileage: {
        type: String,
        required: false
    },
    fuel: { 
        type: String,
        required: false
    },
    emission_class: {
        type: String,
        required: false
    },
    seller: {
        type: String,
        required: false
    },
    gear_type:{
        type: String,
        required: false
    },
    condition: {
        type: String,
        required: false
    },
    registration_year: {
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
    location: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    interior_seats: {
        type: String,
        required: false
    },
    doors: {
        type: String,
        required: false
    },
    seats:{
        type: String,
        required: false
    },
    equipment_description: {
        type: String,
        required: false
    },
    accessories: {
        type: String,
        required: false
    },
    warranty: {
        type: String,
        required: false
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
module.exports = mongoose.model('Automobile', automobileSchema);