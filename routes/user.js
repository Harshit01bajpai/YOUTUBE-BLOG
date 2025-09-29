const express= require("express");
const User=require("../models/user")

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
router.post("/signin", async (req,res)=>{
   const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    if (!user.matchPassword(password)) {
        return res.status(401).send("Invalid email or password");
    }
    // Login success
    res.send("Signin successful!");

})



module.exports=router;
