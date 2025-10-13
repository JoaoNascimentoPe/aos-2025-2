import { Router } from "express";
import models from "../models";
import { generateToken } from "../utils/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("Email e senha são obrigatórios!");

    const user = await models.User.findOne({ where: { email } });

    if (!user) return res.status(404).send("Usuário não localizado!");

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) return res.status(401).send("Senha incorreta!");

    const token = generateToken(user.id);
    return res
      .status(201)
      .json({ message: "Login realizado com sucecsso!", token });
  } catch (e) {
    res.status(500);
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log("Corpo recebido:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await models.User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }

    const token = generateToken(user.id);

    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      token,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default router;
