import User from "../Model/user.js";
import {v4 as uuidv4} from "uuid";
import { setUser} from "../service/auth.js"

//signup 
export const signupHandler = async (req, res) => { 
    console.log("inside controller")
    const { fullname, email, password } = req.body; 
    try { 
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'Please provide name, email, and password' });
        }
        const user = await User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//login 
export const signinHandler = async (req, res) => {  
    const { email, password } = req.body; 
    try { 
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide valid email, and password' });
        }
        const user=await User.findOne({email,password});
        const sessionId=uuidv4();
        setUser(sessionId,user);
        res.cookie("uid",sessionId);
        return res.status(200).json("Login succesfull");
    } catch (error) {
        console.error("Error signin user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



//getAllUser
export const allUsersHandler = async (req, res) => {  
    try {
        const users=await User.find({});
        return res.json(users);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};