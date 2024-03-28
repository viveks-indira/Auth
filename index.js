import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/user.js";
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
mongoose.connect("mongodb://127.0.0.1:27017/Auth")
    .then(() => { console.log("Db Connected") })
    .catch((err) => { console.log("Error ",err) });

// Routes
app.use(userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is live ${port}`);
});