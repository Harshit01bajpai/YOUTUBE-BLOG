const express= require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path= require("path");

const app=express();

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.get("/",(req,res)=>{
    res.render("home");
})


app.listen(process.env.PORT,()=>{
    console.log("server is staerted ");
})