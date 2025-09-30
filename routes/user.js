const express= require("express");
const User=require("../models/user");
const {createTokenForUser}=require("../services/authentication");

const router = express.Router(); 


router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/signin",(req,res)=>{
   return  res.render("signin");
})


router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const { fullname, email, password } = req.body;
        const newUser = await User.create({ fullname, email, password });
        console.log(newUser);
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Signup failed: " + err.message);
    }
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.matchPassword(password)) {
            return res.render("signin", { error: "Invalid email or password" });
        }
        const token = createTokenForUser(user);
        // Set cookie: naam, value
        res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", { error: "Something went wrong" });
    }
});



module.exports=router;
