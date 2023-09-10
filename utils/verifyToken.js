import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=> {
    const token = req.cookies.access_token; //The token we have created while authentication(Login)

    //If the token is empty then there is something wrong with the authentication,
    if(!token) {
        res.status(401).json("You are not Authenticated!");
        return;
    }
     
    //Verify the token
    jwt.verify(token, process.env.JWT, (err,user)=> {
        if(err){
            res.status(403).json("Token is not valid!");
            return;
        } 
        req.user = user;
        next()
    })
}

export const verifyUser = (req,res,next)=> {
    verifyToken(req,res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
              res.status(403).json("You are not authorized!");
              return;
            
        }
    })
}

export const verifyAdmin = (req,res,next)=> {
    verifyToken(req,res, next, ()=> {

        if(req.user.isAdmin == true) {
            console.log(req.user.isAdmin);
            next();
        } else{
             res.status(403).json("You are not authorized!");
            return;
        }
    })
}