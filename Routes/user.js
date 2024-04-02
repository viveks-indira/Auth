import express from "express";
import { registerHandler,allUsersHandler,loginHandler,allUsersNameHandler,refreshHandler} from "../Controller/userController.js";
import { verifyToken } from "../Middleware/validate.js";

const router = express.Router();

router.get("/register", (req, res) => {
    return res.render("register");
});
 
router.post("/register", registerHandler);
router.post("/login", loginHandler);

// Refresh token route
router.post("/refresh", refreshHandler);


//protected api
router.get("/alluser",allUsersHandler);
router.get("/allusernamelist",verifyToken,allUsersNameHandler);
export default router;