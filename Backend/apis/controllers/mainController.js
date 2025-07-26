// const Task = require("../model/curd.model");
// const jwt = require("jsonwebtoken");

// exports.createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getOne = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ error: "Task is not found" });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.update = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body);
//     if (!task) return res.status(404).json({ error: "task is not found" });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.delete = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) return res.status(404).json({ error: "task is not found" });
//     res.json({ message: "task is deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Show Login Page
exports.getLogin = (req, res) => {
  res.render('login');
};

// Handle Login
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secret_key", // use .env for production
      { expiresIn: "5d" }
    );

    // ✅ Return token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.email === "admin@gmail.com",
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Show Register Page
exports.getRegister = (req, res) => {
  res.render('register');
};

// Handle Register
exports.postRegister = async (req, res) => {
  try {
    console.log("Received in controller:", req.body);

    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log("Validation errors:", error.array());
      return res.status(400).json({ errors: error.array() });
    }

    const { username, email, password } = req.body;
    console.log("Creating user:", username, email);

     const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const task = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


  // const { username, password } = req.body;
  //  const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).render('register', {
  //     errors: errors.array()
  //   });
  // }
  // const hashedPassword = await bcrypt.hash(password, 10);
  // try {
  //   const user = new User({ username, password: hashedPassword });
  //   await user.save();
  //   res.redirect('/login');
  // } catch (err) {
  //   res.send('User already exists or an error occurred.');
  // }


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('username');
    res.render('users', { users });
  } catch (err) {
    res.send('Error fetching users');
  }
};



exports.getUsers = async (req, res) => {
  try {
    console.log("GET /users hit");
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: err.message });
  }
};
