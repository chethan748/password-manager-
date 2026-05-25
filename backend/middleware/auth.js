const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token || token === "undefined" || token === "null") {
            return res.status(401).json({
                message: "No token provided, authorization denied"
            });
        }

       

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {
        console.error("Middleware Verification Error:", error.message);
        return res.status(401).json({
            message: "Token is not valid or has expired"
        });
    }
};