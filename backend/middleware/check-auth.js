import jwt from "jsonwebtoken";

const authenticate = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error){
        res.status(401).json({
            success:false,
            data: 'authentication failed'
        });
    }
}

export default authenticate;
