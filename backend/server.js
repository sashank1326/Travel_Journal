// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// // import authRoutes from "./routes/auth.js"; // Ensure the correct path
// import authRoutes from "./routes/authRoutes.js"; // ✅ Correct filename


// dotenv.config();

// const app = express(); // ✅ Define `app` before using it

// app.use(express.json());
// app.use(cors());

// app.use("/api/auth", authRoutes); // ✅ Now it's safe to use `app`

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js"; 
import dashboardRoutes from "./routes/dashboardRoutes.js"; // ✅ Import dashboard routes

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ Add this line to use dashboard routes

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
