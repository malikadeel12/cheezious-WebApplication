const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");
const orderRoutes = require('./routes/order');
const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item")
const authRoutes = require("./routes/authRoutes");
const app = express();


app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true
}));


mongoose.connect('mongodb://localhost:27017/cheezious')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));


app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use('/users', userRoutes);
app.use("/items", itemRoutes)
app.get("/", (req, res) => {
    res.json("Server issue solved");
})

app.listen(8002, () => console.log('Server running on port 8002'));

