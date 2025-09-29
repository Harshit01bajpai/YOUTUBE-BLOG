const express= require("express");
const mongoose = require("mongoose");
const userrouter= require("./routes/user");


require("dotenv").config();
const path= require("path");

const app=express();
app.use(express.urlencoded({ extended: false})); 
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/user",userrouter);
app.get("/",(req,res)=>{
    res.render("home");
})


app.listen(process.env.PORT,()=>{
    console.log("server is staerted ");
})