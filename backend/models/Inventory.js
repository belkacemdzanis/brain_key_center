// models/Inventory.js

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Inventory', inventorySchema);
