import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js"; 
import projectRoutes from "./routes/projectRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/team",teamRoutes);
app.use("/api/project",projectRoutes);

await mongoose.connect(process.env.MONGO_URI).then(
    console.log("Mongo DB connected successfully")
).then(
    app.listen(5000,(req,res)=>{
        console.log("server started");
    })
);