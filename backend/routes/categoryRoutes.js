const express = require('express')
const { createCategory, allCategories, updateCategory, getSingleCategory, deleteCategory } = require('../controller/categoriesController')
const router = express.Router()

router.get("/single-category/:id", getSingleCategory)
router.post("/", createCategory)
router.get("/all-categories", allCategories)
router.put("/update-category/:id", updateCategory)
router.delete("/delete-category/:id", deleteCategory)


module.exports = router