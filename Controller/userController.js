import User from "../Model/user.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const secretKey = "authentication_key";

//login
export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
   // res.json("Logged in Sucessfully ")
   res.status(200).json({ token, message: "Logged in Successfully" });

  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

//signup
export const registerHandler = async (req, res) => {
  try {
    const { fullname,email,password } = req.body;
    
    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await User.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword
    });
    console.log(user)
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) { 
    res.status(500).json({ error: "Registration failed" });
  }
};

//getAllUser
export const allUsersHandler = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//list of user names
export const allUsersNameHandler = async (req, res) => {
  try {
    const allNames=[];
    const users = await User.find({});
    users.forEach(user => {
      allNames.push(user.fullname);
    });
    return res.json(allNames);
  } catch (error) {
    console.error("Error in fetching all names of user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
