import User from "../Model/user.js";


//signup 
export const signupHandler = async (req, res) => { 
    console.log("inside controller")
    try {
        const { name, email, password } = req.body; 
        await User.create({ name, email, password });
        return res.json("User Created Successfully");
    } catch (error) {
        console.error("Error creating user:", error);
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