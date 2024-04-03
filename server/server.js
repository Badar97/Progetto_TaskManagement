const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Inizializza l'app Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configura Sequelize per la connessione al database PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'task_manager', 
});

// Definisci il modello per le attività
const Task = sequelize.define('Task', {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Sincronizza il modello con il database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Aggiungi middleware per il parsing del body JSON
app.use(express.json());

// Configura le route per il backend
// Aggiungi qui le route per le API

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
