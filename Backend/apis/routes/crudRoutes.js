// const express = require("express");
// const router = express.Router();
// const crudController = require("../controllers/crud.controller");

// router.post("/create", crudController.createTask);
// router.get("/list", crudController.getAllTasks);
// router.get("/getone/:id", crudController.getOne);
// router.put("/update/:id", crudController.update);
// router.get("/protected", protectedRoute);
// router.delete("/delete/:id", crudController.delete);

// module.exports = router;

// -----------------------------------------

// const express = require("express");
// const router = express.Router();
// const crudController = require("../controllers/crud.controller");

// const protectedRoute = require("../middleware/middleware");
// const app = express();
// const multer = require("multer");

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "upload/"); // Directory to save files
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname); // Unique file name
// //   },
// // });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// router.post("/upload", upload.single("file"), crudController.uploadFile);
// router.get("/:id", crudController.getFile);

// app.use(express.json());
// router.post("/login", crudController.login);
// router.post(
//   "/create",
//   crudController.createTask
// );
// router.get("/list", crudController.getAllTasks);
// router.get("/getone/:id", crudController.getOne);
// router.put("/update/:id", crudController.update);
// router.get("/protected", protectedRoute);
// router.delete("/delete/:id", crudController.delete);
// router.post("/upload", upload.single("file"), crudController.image);

// router.post("/create", async (req, res) => {
//   try {
//     console.log(req.body); // Debug incoming request
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     // create user logic here (e.g., save to MongoDB)

//     res.status(201).json({ message: "User created" });
//   } catch (err) {
//     console.error("Error in /create:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// // router.get("/protected", protectedRoute, (req, res) => {
// //   res.json({ message: "You are authenticated", user: req.user });
// // });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const controller = require('../controllers/mainController');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const Category = require('../model/Category');
const protectedRoute = require('../middleware/middleware');


// Configure image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/', controller.getLogin);

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/register', controller.getRegister);
router.post('/register',[
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
      .matches(/[0-9]/).withMessage('Password must contain a number')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
  ], controller.postRegister);

router.get('/users', controller.getUsers);

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy admin check
  if (email === "nihal1@gmail.com" && password === "Nihal@123") {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET || "mysecretkey", {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

router.get("/admin-data", protectedRoute, (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json({ message: "This is admin data" });
});

module.exports = router;
