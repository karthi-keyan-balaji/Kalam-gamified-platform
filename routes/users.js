import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all users
router.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new user
router.post("/", (req, res) => {
    const { name, email, age } = req.body;
    db.query("INSERT INTO users (name, email, age) VALUES (?, ?, ?)", 
    [name, email, age], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User added!", id: result.insertId });
    });
});

// Update user
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    db.query("UPDATE users SET name=?, email=?, age=? WHERE id=?", 
    [name, email, age, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User updated!" });
    });
});

// Delete user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted!" });
    });
});

export default router;
