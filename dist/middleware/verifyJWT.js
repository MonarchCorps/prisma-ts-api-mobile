import jwt from "jsonwebtoken";
const verifyJWT = (req, res, next) => {
    const authHeader = (req.headers.authorization || req.headers.Authorization);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.sendStatus(401);
        return;
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, secret, (err, decoded) => {
        if (err || !decoded) {
            res.sendStatus(403);
            return;
        }
        const payload = decoded;
        req.userId = payload.userId;
        next();
    });
};
export default verifyJWT;
