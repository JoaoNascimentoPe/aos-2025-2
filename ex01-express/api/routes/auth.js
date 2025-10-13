import { Router } from "express";
import models from "../models";
import { generateToken, verifyToken } from "../utils/auth";

const router = Router();

router.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) res.send("email e senha são obrigatórios!")
        
        const user = await models.User.findOne({where: { email: login },})
            
        if (!user) {
            res.send("usuário não localizado!")
        }

        const token = generateToken(user.id)
        res.status(201).json({token})
    } catch (e) {
        res.status(500)
    }
})