import express from "express";
import {updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js" 
import {  verifyUser } from "../utils/verifyToken.js";

const router = express.Router();



//Update User
router.put("/:id",verifyUser,updateUser); //Working as Expected

//Delete User
router.delete("/:id",verifyUser,deleteUser); //Working as Expected

//Get 
router.get("/:id",verifyUser,getUser); //Working as Expected

//GetAll 
router.get("/",getUsers); //Working As Expected. 

export default router;