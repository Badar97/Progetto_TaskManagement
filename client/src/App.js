import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    author: '',
    deadline: '',
    title: '',
    description: ''
  });
  const [editTask, setEditTask] = useState(null);

  // Effettua una chiamata API per recuperare tutte le attività
  useEffect(() => {
    axios.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Errore nel recuperare le attività:', error);
      });
  }, []);

  // Gestisci il cambiamento di input per il form di creazione o modifica di un'attività
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Invia una chiamata API per creare una nuova attività
  const handleAddTask = () => {
    axios.post('/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({
          author: '',
          deadline: '',
          title: '',
          description: ''
        });
      })
      .catch(error => {
        console.error('Errore nel creare una nuova attività:', error);
      });
  };

  // Gestisci la modifica di un'attività
  const handleEditTask = () => {
    axios.put(`/tasks/${editTask.id}`, editTask)
      .then(response => {
        const updatedTasks = tasks.map(task => {
          if (task.id === editTask.id) {
            return response.data;
          }
          return task;
        });
        setTasks(updatedTasks);
        setEditTask(null);
      })
      .catch(error => {
        console.error('Errore nell\'aggiornare l\'attività:', error);
      });
  };

  // Visualizza il modulo di creazione/modifica di un'attività
  const renderTaskForm = () => {
    return (
      <form onSubmit={editTask ? handleEditTask : handleAddTask}>
        <input type="text" name="author" placeholder="Autore" value={editTask ? editTask.author : newTask.author} onChange={handleInputChange} required />
        <input type="datetime-local" name="deadline" value={editTask ? editTask.deadline : newTask.deadline} onChange={handleInputChange} required />
        <input type="text" name="title" placeholder="Titolo" value={editTask ? editTask.title : newTask.title} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Descrizione" value={editTask ? editTask.description : newTask.description} onChange={handleInputChange} required />
        <button type="submit">{editTask ? 'Modifica Attività' : 'Aggiungi Attività'}</button>
        {editTask && <button onClick={() => setEditTask(null)}>Annulla Modifica</button>}
      </form>
    );
  };

  // Visualizza l'elenco delle attività
  const renderTaskList = () => {
    return (
      <div>
        <h2>Elenco Attività</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>Autore: {task.author}</p>
              <p>Scadenza: {new Date(task.deadline).toLocaleString()}</p>
              <p>{task.description}</p>
              <button onClick={() => setEditTask(task)}>Modifica</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Gestione Attività</h1>

      {/* Form per creare o modificare un'attività */}
      {renderTaskForm()}

      {/* Visualizza l'elenco delle attività */}
      {renderTaskList()}
    </div>
  );
}

export default App;
