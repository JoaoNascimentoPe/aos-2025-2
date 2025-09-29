import { Router } from "express";
import models from "../models";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.json(user);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await user.update(req.body);
    return res.json(user);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await user.destroy();
    return res.status(204).send(); // Sem conteúdo
  } catch (err) {
    console.error("Erro ao excluir usuário:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
