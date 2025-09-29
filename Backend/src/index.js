import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import authRouter from "../src/routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app=express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(compression()); // compress responses for faster speed
app.use(cookieParser());

//All the routes pages
app.use('/api/auth',authRouter);

app.get("/",(req,res)=>{
  res.send("API is running....");
});




const PORT=process.env.PORT||5000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});