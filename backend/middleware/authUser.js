import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Extract the Bearer token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using your JWT secret
        req.userId = decoded.id;  // Attach userId to the request object
        next();  // Pass control to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authUser;
