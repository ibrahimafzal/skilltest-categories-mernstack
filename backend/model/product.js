const mongoose = require('mongoose')

const ProductModel = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    pic: { type: String }
})

module.exports = mongoose.model('products', ProductModel)