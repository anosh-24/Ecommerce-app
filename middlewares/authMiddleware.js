import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
      }
  
      const token = authHeader.split(' ')[1]; // Extract the actual token
      const decode = JWT.verify(token, process.env.JWT_SECRET);
  
      req.user = decode;
      next();
    } catch (error) {
      console.log('Auth Middleware Error:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
  };
  

//admin access
export const isAdmin = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'UnAuthorized Access'
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message: 'error in admin middleware'
        })
    }
}