import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import listingRoute from './routes/listingRoute.js'
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{console.log("Database Connected")})
.catch(error=>{console.log("MongoDB connection error" , error);
})

const app =express();
const port = 2404;
app.use(express.json())// we can't directly send json to the server from the frontend if we do we get undefeined but after this we got the data . it allow as the server to input as a json
app.use(cookieParser());
app.use('/api/user',userRouter)
app.use("/api/auth",authRoute)
app.use("/api/listing",listingRoute)

    app.use((err,req,res,next)=>{
        const statusCode = err.statusCode || 500;
        const message = err.message || "internal server error"
        return res.status(statusCode).json({
            success:false,
            statusCode,
            message,

        })
    })


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})


