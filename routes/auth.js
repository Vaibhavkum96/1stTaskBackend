import express from "express";
import { register,login } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register); //Working As Expected
router.post("/login", login);  //Working as Expected

export default router;