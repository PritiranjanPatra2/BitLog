import User from "../models/User.js";
import jwt from 'jsonwebtoken'
export const register =async (req,res)=>{
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"Email already in use"
        });
    }
    const user=new User({name,email,password});
    await user.save();
    const token =jwt.sign({id:user._id},'xxxxx',{
        expiresIn:'1h'
    })
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000,
    })
    res.status(201).json({
        success:true,
        message:"User created successfully",
        user:user
    });
}
export const login =async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password"
        });
    }
    const isMatch =user.password===password;
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid email or password"
        });
    }
    const token =jwt.sign({id:user._id},'xxxxx',{
        expiresIn:'1h'
    })
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000,
    })
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
      })
}
export const isUser=async (req,res)=>{
 
    
    try {
        const {userId}=req;
        const user=await User.findById(userId).select("-password");
        return res.json({
            success:true,
            user:user
        })
        
    } catch (error) {
        console.log(error.message);
        
        res.json({
            success:false,
            message:error.message
        })
    }
} 
export const logout=async (req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000,
        });
        return res.json({
            success:true,
            message:"Logged out successfully"
        })
    } catch (error) {
        console.log(error.message);
        
        res.json({
            success:false,
            message:error.message
        })
    }
}
export const allUser=async (req,res)=>{
    try {
        const users=await User.find().select("-password");
        return res.json({
            success:true,
            users:users
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
        
    }
}