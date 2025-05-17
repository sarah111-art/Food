import jwt from "jsonwebtoken"

const adminAuth = async (req,resizeBy,next)=>{
    try{
        const {token} = req.headers
        if(!token){
            return res.status(401).json({message:"No token provided"})
        }
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(token_decoded!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
            return res.status(401).json({message:"Invalid token"})
        }
        next()
    }catch(error){

    }
}

export default adminAuth