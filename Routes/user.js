import express from "express";
import { signupHandler,allUsersHandler,signinHandler } from "../Controller/userController.js";

const router = express.Router();

// Handle GET request for /signup to render sign-up page
router.get("/register", (req, res) => {
    return res.render("register");
});
// Handle POST request for /users to process sign-up form submission
router.post("/register", signupHandler);
router.post("/login", signinHandler);
router.get("/alluser",allUsersHandler);
export default router;