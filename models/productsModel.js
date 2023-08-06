const { Schema, model } = require('mongoose')

const productsSchema = new Schema({
	_id: Number,
	productName: String,
    brand: String,
    stock: Number,
})
productsSchema.index({
	productName: 'text',
	brand: 'text',
})
const ProductsModel = model('products_collections', productsSchema)

module.exports = ProductsModel