import { Router } from "express";
import models from "../models";

const router = Router();

// List all tarefas
router.get("/", async (req, res) => {
  try {
    const tarefas = await models.Tarefa.findAll();
    return res.json({ results: tarefas });
  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Get tarefa by ID
router.get("/:tarefaId", async (req, res) => {
  try {
    const tarefa = await models.Tarefa.findByPk(req.params.tarefaId);
    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    return res.json(tarefa);
  } catch (err) {
    console.error("Erro ao buscar tarefa:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Create tarefa
router.post("/", async (req, res) => {
  try {
    const tarefa = await models.Tarefa.create(req.body);
    return res.status(201).json(tarefa);
  } catch (err) {
    console.error("Erro ao criar tarefa:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Update tarefa
router.put("/:tarefaId", async (req, res) => {
  try {
    const tarefa = await models.Tarefa.findByPk(req.params.tarefaId);
    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    await tarefa.update(req.body);
    return res.json(tarefa);
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Delete tarefa
router.delete("/:tarefaId", async (req, res) => {
  try {
    const tarefa = await models.Tarefa.findByPk(req.params.tarefaId);
    if (!tarefa) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    await tarefa.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir tarefa:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
