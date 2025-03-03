const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("http://localhost:5500/cheeziousFrontend/index.html");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect("/login");
    });
});

module.exports = router;
