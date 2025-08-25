import express from "express";
import { google, signin, signup } from "../controllers/authController.js";
import { verfiyToken } from "../utils/verfiyUser.js";


const authRoute = express.Router();

authRoute.post('/signup',signup);
authRoute.post('/signin',signin);
authRoute.post("/google", google);
export default authRoute 