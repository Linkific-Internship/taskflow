import { createContext, useContext, useState } from 'react';
import { getProjects, saveProjects, getTasks, saveTasks } from '../utils/localStorage';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(getProjects());
  const [tasks, setTasks] = useState(getTasks());

  // PROJECT ACTIONS
  const addProject = (name, description) => {
    const newProject = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    saveProjects(updated);
    return newProject;
  };

  const deleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
    // delete related tasks too
    const updatedTasks = tasks.filter((t) => t.projectId !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editProject = (id, name, description) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, name, description } : p
    );
    setProjects(updated);
    saveProjects(updated);
  };

  // TASK ACTIONS
  const addTask = (projectId, title, description, priority, dueDate) => {
    const newTask = {
      id: Date.now().toString(),
      projectId,
      title,
      description,
      priority,
      dueDate,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
  };

  const updateTask = (id, updates) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const moveTask = (id, newStatus) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const getProjectTasks = (projectId) => {
    return tasks.filter((t) => t.projectId === projectId);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        tasks,
        addProject,
        deleteProject,
        editProject,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        getProjectTasks,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);