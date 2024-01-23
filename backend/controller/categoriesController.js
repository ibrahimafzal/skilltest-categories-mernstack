const Category = require("../model/category")

const createCategory = async (req, res) => {
    const { name, description, status } = req.body
    try {
        if (!name, !description, !status) {
            return res.status(400).json({ msg: "Please fil all the fields" })
        }
        const findCategory = await Category.findOne({ name: name })
        if (!findCategory) {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } else {
            return res.status(400).json({ msg: "Category Already Exist" })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    };
}

const allCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const getSingleCategory = async (req, res) => {
    const catId = req.params.id;

    const category = await Category.findById(catId);

    if (!category) {
        return res.status(404).json({ msg: "No Category found" })
    }

    res.status(200).json(category);
}

const updateCategory = async (req, res) => {
    const catId = req.params.id;
    const updates = req.body;
    const options = { new: true };
    try {
        const category = await Category.findByIdAndUpdate(catId, updates, options);
        res.json(category);
    } catch (err) {
        res.status(400).json({ msg: 'Failed to Update' });
    }
}

const deleteCategory = async (req, res) => {
    const catId = req.params.id;
    try {
        let category = await Category.findById(catId);
        if (!category) {
            return new Error("The Category was not found")
        }
        const removeCat = await Category.findByIdAndDelete({ _id: catId });
        res.json(removeCat);
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Could not delete this product." })
    }
}

module.exports = { createCategory, allCategories, updateCategory, getSingleCategory, deleteCategory }