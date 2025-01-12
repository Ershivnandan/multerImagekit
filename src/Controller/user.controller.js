import { User } from "../Model/user.model.js";
import bcrypt from "bcryptjs";

export const SignupUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        const avatar = req.file ? req.file.path : null;

        const isExistingUser = await User.findOne({email});

        if(isExistingUser){
            res.status(400).json({message: "User already Registered"});
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = new User({name, email, password: hashedPass, avatar});
        newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error", error })
    }
}