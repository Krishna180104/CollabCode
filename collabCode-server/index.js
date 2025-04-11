const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes"); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/team",teamRoutes);

mongoose.connect(process.env.MONGO_URI,()=>{
    console.log("Mongo DB connected");
}).then(()=>{
    app.listen(5000,(req,res)=>{console.log("Server started")});
}).catch((err)=>console.log(err));