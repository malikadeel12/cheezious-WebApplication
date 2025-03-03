const express = require("express");
const Order = require("../models/order");  
const router = express.Router();

router.post("/orderdata", async (req, res) => {
    try {
        if (!req.body.customerName || !req.body.customerPhone || !req.body.customerAddress || !req.body.cart_items) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, orderId: order._id, message: "Order placed successfully" });
    } catch (err) {
        console.error("Error saving order:", err);
        res.status(500).json({ message: "Error saving order", error: err });
    }
});

router.get("/orderdata", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Error fetching orders", error: err });
    }
});

module.exports = router;
