import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message:"User already exists"});

        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashed,role});
        await user.save();
        res.status(201).json({message:"User created succesfully"});

        
    } catch (err)
    {
        res.status(500).json({message:err.message});
    }
};
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"User Not Found"});

        const isMatch = bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

