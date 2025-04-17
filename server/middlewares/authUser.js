import jwt from 'jsonwebtoken'
export const authUser=async (req,res,next)=>{
    try {
        const {token} =req.cookies;
        if(!token){
            return res.status(401).json({msg:"Please login to access this resource"})
        }
        const tokenDecode=jwt.verify(token,'xxxxx');
        req.userId=tokenDecode.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Server error"})
        
    }
}