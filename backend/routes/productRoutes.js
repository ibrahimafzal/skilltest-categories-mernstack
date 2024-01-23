const express = require('express')
const { createProduct, allProducts, updateProduct, deleteProduct, getSingleProduct } = require('../controller/producrtController')
const router = express.Router()

router.get("/get-product/:id", getSingleProduct)
router.post("/", createProduct)
router.get("/all-products", allProducts)
router.put("/update-product/:id", updateProduct)
router.delete("/delete-product/:id", deleteProduct)


module.exports = router