const Product = require('../model/product')

// Create
const createProduct = async (req, res) => {
    const { name, description, price, pic } = req.body
    try {
        if (!name || !description || !price || !pic) {
            return res.status(400).json({
                msg: "Please enter all fields"
            })
        }
        const product = await Product.create({ name, description, price, pic });
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    };
}

// All
const allProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const getSingleProduct = async (req, res) => {
    const prodId = req.params.id;

    const product = await Product.findById(prodId);

    if (!product) {
        return res.status(404).json({ msg: "No product found" })
    }

    res.status(200).json(product);
}

// Update
const updateProduct = async (req, res) => {
    const prodId = req.params.id;
    const updates = req.body;
    const options = { new: true };
    try {
        const product = await Product.findByIdAndUpdate(prodId, updates, options);
        res.json(product);
    } catch (err) {
        res.status(400).json({ msg: 'Failed to Update' });
    }
}

// Delete
const deleteProduct = async (req, res) => {
    const prodId = req.params.id;
    try {
        let product = await Product.findById(prodId);
        if (!product) {
            return new Error("The Product was not found")
        }
        const removeProd = await Product.findByIdAndDelete({ _id: prodId });
        res.json(removeProd);
    } catch (err) {
        res.status(400).json({ msg: "Could not delete this product." })
    }
}

module.exports = { createProduct, allProducts, updateProduct, deleteProduct, getSingleProduct }