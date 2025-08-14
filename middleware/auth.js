const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token) {
            token = token.split(" ")[1]; // "Bearer tokenValue"
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            next(); // ✅ next call karo
        } else {
            return res.status(401).json({ message: "Unauthorized User" });
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" });
    }
};

module.exports = auth;
