const mongoose = require('mongoose')

const CategoryModel = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    parentId: { type: String, required: false }
})

module.exports = mongoose.model('categories', CategoryModel)