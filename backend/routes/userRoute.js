import express from "express";
import { adminLogin,loginUser,registerUser,forgotPassword, resetPassword, } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);    
userRoute.post("/admin", adminLogin);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);
export default userRoute;