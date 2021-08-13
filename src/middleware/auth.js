import jwt from 'jsonwebtoken';
import { secretToken } from '../../config';

export const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) return res.status(403).send("Token is required for authentication");

    try {
        const decoded = jwt.verify(token, secretToken);
        req.user = decoded;

    }
    catch(err){
        res.status(403).send("Invalid Token")    
    }
    return next();
}
