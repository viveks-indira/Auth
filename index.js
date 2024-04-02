import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/user.js"; 
import pageRoutes from "./Routes/pages.js"; 






import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Specify the directory where your views are located
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect("mongodb+srv://root:root@cluster0.v0b0zhp.mongodb.net/Auth?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => { console.log("Db Connected") })
    .catch((err) => { console.log("Error ",err) });

// Routes
app.use("/",userRoutes);  
app.use("/pages",pageRoutes); 


// Start the server
app.listen(port, () => {
    console.log(`Server is live ${port}`);
});