import express from "express";
 
const router = express.Router();

router.get("/register", (req, res) => {
    return res.render("register");
});

router.get("/login", (req, res) => {
    return res.render("login");
});


router.get("/home", (req, res) => {
    return res.render("home");
});

router.get("/service", (req, res) => { 
    return res.render("service");
});
export default router;