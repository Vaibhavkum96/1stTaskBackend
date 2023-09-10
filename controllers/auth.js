import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res,next)=> {
    try{
          const userNameExists = await User.findOne({username: req.body.username}); 
          
          //Check for the unique username
          if(userNameExists){
            res.status(400).json("Username Already Exists!");
            return;
          }
          
        //Adding New User
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email : req.body.email,
            password : hash,
            isAdmin: req.body.isAdmin,
          })

          await newUser.save()
          res.status(200).send("User has been created!");


          
    }
    catch(err){
        next(err);
    }
}

export const login = async(req,res,next)=> {

  try{
       const user = await User.findOne({username: req.body.username});
        //If User do not exists 
       if(!user){
          res.status(404).json("User Not Found!");
          return;
       }

       const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
       
       //If Password is not Correct 
       if(!isPasswordCorrect){
        res.status(400).json("Username and Password Do not Match!");
        return;
       }
       
       //Creating Cookies to store user info to carry out tasks.
       const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT);
       
       //Returning the cookie with Json
       const {password, isAdmin, ...otherDetails} = user._doc;
       res.cookie("access_token", token, {
          httpOnly: true,
       }).status(200).json({...otherDetails});
  }

  catch(err){
    next(err);
  }

}