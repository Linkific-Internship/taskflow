// AUTH
export const saveUser = (user) => {
  localStorage.setItem('taskflow_user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('taskflow_user');
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem('taskflow_user');
};

// PROJECTS
export const getProjects = () => {
  const projects = localStorage.getItem('taskflow_projects');
  return projects ? JSON.parse(projects) : [];
};

export const saveProjects = (projects) => {
  localStorage.setItem('taskflow_projects', JSON.stringify(projects));
};

// TASKS
export const getTasks = () => {
  const tasks = localStorage.getItem('taskflow_tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
};