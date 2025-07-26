require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const categoryRoutes = require( "./apis/routes/categoryRoutes");
const crudRoutes = require("./apis/routes/crudRoutes");
const cors = require("cors");


const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ✅ Use a single API path for all your backend routes
app.use("/api/auth", crudRoutes);
app.use("/api", crudRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/uploads', express.static('uploads'));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// app.use("/api/categories", crudRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// // Demo HTML route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "demo.html"));
// });

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
