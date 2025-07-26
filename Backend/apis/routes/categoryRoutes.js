const express = require("express");
const multer = require("multer");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createCategory);
router.get("/", getCategories);

router.delete("/:id", deleteCategory);

router.put("/:id", upload.single("image"), updateCategory);

module.exports = router;
