const jwt = require('jsonwebtoken');

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Corrected the split to separate by space

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ status: false, message: "Token is not valid" });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ status: false, message: "You are not authenticated!" });
    }
};

// Middleware to verify token and user authorization
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Client' || req.user.userType === 'Admin' || req.user.userType === 'Vendor' || req.user.userType === 'Driver') {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to access this route" });
        }
    });
};

// Middleware to verify if the user is a vendor or admin
const verifyVendor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Admin' || req.user.userType === 'Vendor') {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to access this route" });
        }
    });
};

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Admin') {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to access this route" });
        }
    });
};

// Middleware to verify if the user is a driver
const verifyDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === 'Driver') {
            next();
        } else {
            return res.status(403).json({ status: false, message: "You are not allowed to access this route" });
        }
    });
};

module.exports = { verifyTokenAndAuthorization, verifyVendor, verifyAdmin, verifyDriver };
