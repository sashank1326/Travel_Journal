
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import path from "path";

// import authRoutes from "./routes/authRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
// import geminiRoutes from "./routes/geminiRoutes.js";
// import flightRoutes from "./routes/flightRoutes.js";
// import hotelRoutes from "./routes/hotelRoutes.js"; 

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());


// // ✅ Serve uploaded images as static files
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/uploads", express.static("uploads"));


// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/gemini", geminiRoutes); // ✅ Add Gemini Route
// app.use("/api/flights", flightRoutes); // ✅ Enabled Flights API
// app.use("/api/hotels", hotelRoutes);  // Add this line


// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));


// //   // Serve images from the 'uploads' folder
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
// import testRoutes from "./routes/testRoutes.js";
import geoapifyRoutes from "./routes/geoapifyRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Serve uploaded images as static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/gemini", geminiRoutes); // ✅ Add Gemini Route
app.use("/api/flights", flightRoutes); // ✅ Enabled Flights API
// app.use("/api", testRoutes);
app.use("/api/geoapify", geoapifyRoutes);  // ✅ Add Geoapify Route

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));


