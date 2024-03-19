import jwt from "jsonwebtoken";

const userAuthentication = async(req,res,next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"User are not autenticated"
            })
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decodedToken?._id;
        next();
      }catch(error){
        console.log(error.message);
      }
      next();
}

export default userAuthentication;