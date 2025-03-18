import express from "express";
import db from "./db.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware
app.use("/users", userRoutes); // User routes

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
