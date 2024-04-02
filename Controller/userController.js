import User from "../Model/user.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const secretKey = "authentication_key";



// Token refresh handler
export const refreshHandler = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const user = await User.findById(decoded.userId);

    // Generate new access token
    const accessToken = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1 mins",
    });


    res.status(200).json({ accessToken, message: "Access token refreshed successfully" });
  } catch (error) {
    console.error("Token refresh failed:", error);
    res.status(401).json({ error: "Invalid refresh token" });
  }
};

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
    const accessToken = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1 mins",
    });

    // Generate refresh token
    const refreshToken = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "7d",
    });

    res.status(200).json({ accessToken, refreshToken, message: "Logged in successfully" });

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
   res.render("home");
    //res.status(201).json({ message: "User registered successfully" });
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
