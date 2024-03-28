import express from "express";
import { signupHandler,allUsersHandler } from "../Controller/userController.js";

const router = express.Router();

// Handle GET request for /signup to render sign-up page
router.get("/signup", (req, res) => {
    return res.render("signup");
});

// Handle POST request for /users to process sign-up form submission
router.post("/user", signupHandler);
// console.log("inside controller")
// router.route("/signup")
//     .get((req, res) => {
//         return res.render("signup");
//     })
//     .post(signupHandler);
router.get("/alluser",allUsersHandler);
export default router;