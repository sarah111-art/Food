import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

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
export { registerUser, loginUser, adminLogin };