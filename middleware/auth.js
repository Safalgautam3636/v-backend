const jwt=require('jsonwebtoken');
const denv=require('dotenv')
denv.config()
const verifyAuth=(req,res,next)=>{
    const token=req.header('x-auth-token');
    if(!token)return req.status(401).send("Access denied.No token");
    
    try{
        const verify=jwt.verify(token,process.env.KEY);
        req.user=verify;
        next(); 
    }
    catch(e){
        return res.status(400).send("Invalid token");
    }

}
module.exports=verifyAuth;