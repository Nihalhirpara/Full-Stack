const fs = require("fs");
const path = require("path");
const Category = require("../model/Category.js");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file.filename;
    const category = new Category({ name, image });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    // Delete image from uploads folder
    const imagePath = path.join(__dirname, "..", "uploads", category.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // If new image uploaded, delete the old one
    if (req.file && category.image) {
      const oldImagePath = path.join(__dirname, "../uploads", category.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Old image deleted:", oldImagePath);
      }
    }
    // Update fields
    category.name = name || category.name;
    if (req.file) {
      category.image = req.file.filename;
    }
    console.log("Existing image:", category.image);
    console.log("New image uploaded:", req.file?.filename);

    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
