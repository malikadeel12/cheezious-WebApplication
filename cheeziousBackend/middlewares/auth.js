const jwt = require("jsonwebtoken");

const secretKey = "123AdilM@lik";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No Token Provided" });
        }

        const decoded = jwt.verify(token, secretKey); 
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error("Error Occurred: Token is invalid");
        return res.status(403).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
