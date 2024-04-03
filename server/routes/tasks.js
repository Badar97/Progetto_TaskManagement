// server/routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Route per recuperare tutte le attività
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore nel recuperare le attività.' });
  }
});

// Route per creare una nuova attività
router.post('/', async (req, res) => {
  const { author, deadline, title, description } = req.body;
  try {
    const newTask = await Task.create({ author, deadline, title, description });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore nel creare una nuova attività.' });
  }
});

// Route per aggiornare un'attività esistente
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const { author, deadline, title, description } = req.body;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Attività non trovata.' });
    }
    task.author = author;
    task.deadline = deadline;
    task.title = title;
    task.description = description;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore nell\'aggiornare l\'attività.' });
  }
});

module.exports = router;
