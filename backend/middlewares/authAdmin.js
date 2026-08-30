import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        const isValidAdmin = (typeof token_decode === 'object' && token_decode.role === 'admin' && token_decode.email === process.env.ADMIN_EMAIL)
            || (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);

        if (!isValidAdmin) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        req.admin = { email: process.env.ADMIN_EMAIL };
        next();
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export default authAdmin;
