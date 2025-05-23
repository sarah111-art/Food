import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";
import crypto from "crypto";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

//user register route
const registerUser = async (req, res) => {

try{
    const { name, email, password } = req.body;
    //check if user already exists or not
    const exists =await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }
    //checking email format and password length
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const user =await newUser.save()
    //creating token
    const token = createToken(user._id);
    res.json({success:true,token})

}catch(error){
  console.log(error)
  res.status(500).json({error:error.message})
}   
}
//user login route
const loginUser = async (req, res) => {
try{
    const { email, password } = req.body;
    //check if user exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    //checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    //creating token
    const token = createToken(user._id);
    res.json({success:true,token})
}catch(error){
  console.log(error)
  res.status(500).json({error:error.message})
}
}
//admin login route
// const adminLogin = async (req, res) => {

// try{
// const { email, password } = req.body
// if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//   //creating token
//   const token = jwt.sign(email+password, process.env.JWT_SECRET)
//   res.json({success:true,token})
// }else
// {
//     res.status(400).json({ error: "Invalid credentials" });
// }
// }catch(error){
//   console.log(error)
//   res.status(500).json({error:error.message})
// }
// }
// export { registerUser, loginUser, adminLogin };
const adminLogin = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log("Received login data:", email, password); // Log dữ liệu nhận được từ frontend

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          const token = jwt.sign({ email }, process.env.JWT_SECRET);
          return res.json({ success: true, token });
      } else {
          return res.status(400).json({ error: "Invalid credentials" });
      }
  } catch (error) {
      console.log("Error:", error.message); // Log lỗi
      res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email
   const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Your password reset token is ${resetToken}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Password reset token sent to email." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    if (
      !user.resetToken ||
      user.resetToken !== hashedToken ||
      user.resetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, adminLogin ,forgotPassword,resetPassword};