import { Router } from "express";
import models from "../models";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const messages = await models.Message.findAll({ include: models.User });
    return res.json(messages);
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/:messageId", async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId, {
      include: models.User,
    });
    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    return res.json(message);
  } catch (err) {
    console.error("Erro ao buscar mensagem:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const message = await models.Message.create(req.body);
    return res.status(201).json(message);
  } catch (err) {
    console.error("Erro ao criar mensagem:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.put("/:messageId", async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    await message.update(req.body);
    return res.json(message);
  } catch (err) {
    console.error("Erro ao atualizar mensagem:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/:messageId", async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    await message.destroy();
    return res.status(204).send(); // Sem conteúdo
  } catch (err) {
    console.error("Erro ao excluir mensagem:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
