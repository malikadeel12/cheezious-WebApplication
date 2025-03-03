const express = require("express");
const {Item} = require("../models/item");
const  authMiddleware  = require("../middlewares/auth");

const routes = express.Router();

// Add new item
routes.post("/add", authMiddleware, async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const newItem = new Item({ name, description, price, imageUrl });
        await newItem.save();
        return res.json({ message: "Successfully added new item" });
    } catch (error) {
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
});

// Update item price
routes.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const { price } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { price }, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Your item is successfully updated", updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error: error.message });
    }
});

// Delete item
routes.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Successfully deleted item" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
});

// Get all items
routes.get("/all", async (req, res) => {
    try {
        const items = await Item.find();
        res.json({ message: "All Items", items });
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
});

module.exports = routes;
