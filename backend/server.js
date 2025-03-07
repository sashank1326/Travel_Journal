// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config(); // Load environment variables

// // Use authentication routes
// app.use("/api/auth", authRoutes);

// const app = express();
// app.use(express.json()); // Middleware to parse JSON
// app.use(cors()); // Allow cross-origin requests

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Default route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Travel Journal API!");
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import authRoutes from "./routes/auth.js"; // Ensure the correct path
import authRoutes from "./routes/authRoutes.js"; // ✅ Correct filename


dotenv.config();

const app = express(); // ✅ Define `app` before using it

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes); // ✅ Now it's safe to use `app`

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
