import express from "express";
import { registerHandler,allUsersHandler,loginHandler,allUsersNameHandler} from "../Controller/userController.js";
import { verifyToken } from "../Middleware/validate.js";

const router = express.Router();

// Handle GET request for /signup to render sign-up page
router.get("/register", (req, res) => {
    return res.render("register");
});
// Handle POST request for /users to process sign-up form submission
router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/alluser",verifyToken,allUsersHandler);
router.get("/allusernamelist",verifyToken,allUsersNameHandler);
export default router;