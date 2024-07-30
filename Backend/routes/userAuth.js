import jwt from "jsonwebtoken";

const authentication = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
    {
        return res.status(401).json({message:"Authentication token required"});
    }

    jwt.verify(token,"bookverse",(err,user)=>{
        if(err)
        {
            return res.status(403)
            .json({message:"Token expired. please sign in again"});
        }
        req.user = user;
        next();
    });
};
export default authentication;