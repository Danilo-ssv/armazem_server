const { Router } = require('express')
const router = Router()
const {
	login,
	updateAccount,
	authorization,
} = require('../controllers/authController.js')
const {
	getProducts,
	editProduct,
	deleteProduct,
	newProduct,
	searchProduct,
} = require('../controllers/productsController.js')

router.post('/new_product', authorization, newProduct)
router.put('/edit_product', authorization, editProduct)
router.put('/delete_product', authorization, deleteProduct)

router.get('/search_product', authorization, searchProduct)
router.get('/get_products', authorization, getProducts)

router.post('/login', login)
router.put('/update_account', authorization, updateAccount)

module.exports = router