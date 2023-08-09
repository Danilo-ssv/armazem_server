const ProductsModel = require('../models/products_model.js')

const productsController = {

	getProducts: async (req, res) => {
    const products = await ProductsModel.find()
    .skip(req.headers.page * 3 - 3)
    .limit(3)

    return res.json(products)
	},

  newProduct: async (req, res) => {
    let newProduct = new ProductsModel({
      _id: Math.floor(Math.random() * 100 * 100),
      productName: req.body.productName,
      brand: req.body.brand,
      stock: parseInt(req.body.stock),
    })

    try{
      await newProduct.save()
      return res.json({err: false})
    }catch(err){
      return res.json({err: true})
    }
  },

  editProduct: (req, res) => {
    ProductsModel.findOneAndUpdate({_id: req.body._id}, {
      _id: req.body._id,
      productName: req.body.productName,
      brand: req.body.brand,
      stock: parseInt(req.body.stock),
    }, {
      returnOriginal: false
    }).then(() => {
      return res.json({err: false})
    }).catch(err => {
      return res.json({err: true})
    })
  },

  deleteProduct: (req, res) => {
    ProductsModel.deleteOne({_id: req.body._id})
    .then(()=>{
      return res.json({err: false})
    }).catch(err=>{
      return res.json({err: true})
    })
  },

  searchProduct: async (req, res) => {
    const { id, productName } = req.query

    if(id != '') {
      const products = await ProductsModel.find({ _id: parseInt(id) })

      return res.json({ products, searchParam: id })

    }else if(productName != '') {
      const products = await ProductsModel.find({$text: {$search: productName}})
      .limit(5)

      return res.json({ products, searchParam: productName })

    }else {
      return res.sendStatus(400)
    }
  }
}

module.exports = productsController