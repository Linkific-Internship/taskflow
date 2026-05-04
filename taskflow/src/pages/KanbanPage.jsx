import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import { useProject } from '../context/ProjectContext';
import Toast from '../components/shared/Toast';
import useToast from '../hooks/useToast';

const COLUMNS = [
  { id: 'todo', label: 'To Do' },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

const PRIORITIES = ['low', 'medium', 'high'];

const priorityColor = (priority) => {
  if (priority === 'high') return 'bg-red-100 text-red-600';
  if (priority === 'medium') return 'bg-yellow-100 text-yellow-600';
  return 'bg-green-100 text-green-600';
};

const KanbanPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, getProjectTasks, addTask, deleteTask, moveTask } = useProject();
  const { toast, showToast, hideToast } = useToast();

  const project = projects.find((p) => p.id === projectId);
  const tasks = getProjectTasks(projectId);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  // Filter states
  const [filterPriority, setFilterPriority] = useState('all');

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    if (filterPriority === 'all') return tasks;
    return tasks.filter((t) => t.priority === filterPriority);
  }, [tasks, filterPriority]);

  if (!project) {
    return (
      <Layout>
        <p className="text-gray-500 text-sm">Project not found.</p>
      </Layout>
    );
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    setTitleError('');

    // Validation
    if (!title.trim()) {
      setTitleError('Task title is required');
      return;
    }
    if (title.trim().length < 3) {
      setTitleError('Title must be at least 3 characters');
      return;
    }

    addTask(projectId, title.trim(), description.trim(), priority, dueDate);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setShowModal(false);
    showToast('Task added successfully');
  };

  const handleMoveTask = (taskId, newStatus) => {
    moveTask(taskId, newStatus);
    const statusLabel = COLUMNS.find((c) => c.id === newStatus)?.label;
    showToast(`Task moved to ${statusLabel}`);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setSelectedTask(null);
    showToast('Task deleted', 'error');
  };

  return (
    <Layout>
      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => navigate('/projects')}
            className="text-xs text-gray-400 hover:text-gray-600 mb-1 block"
          >
            ← Back to Projects
          </button>
          <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {project.description || 'No description'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          + Add Task
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs text-gray-500 font-medium">Filter by priority:</span>
        <div className="flex gap-2">
          {['all', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                filterPriority === p
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className="bg-gray-100 rounded-xl p-4 min-h-[400px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  {col.label}
                </h3>
                <span className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="flex flex-col gap-3">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => setSelectedTask(task)}
                  >
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-400">
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Add Task
            </h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleError('');
                  }}
                  placeholder="Task title"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    titleError ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {titleError && (
                  <p className="text-xs text-red-500 mt-1">{titleError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setTitleError('');
                    setTitle('');
                  }}
                  className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {selectedTask.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedTask.description || 'No description'}
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Priority</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-gray-800 font-medium">
                  {COLUMNS.find((c) => c.id === selectedTask.status)?.label}
                </span>
              </div>
              {selectedTask.dueDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Due Date</span>
                  <span className="text-gray-800">{selectedTask.dueDate}</span>
                </div>
              )}
            </div>

            {/* Move Task */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Move to</p>
              <div className="flex gap-2">
                {COLUMNS.filter((c) => c.id !== selectedTask.status).map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      handleMoveTask(selectedTask.id, col.id);
                      setSelectedTask(null);
                    }}
                    className="flex-1 text-xs border border-gray-300 text-gray-600 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleDeleteTask(selectedTask.id)}
                className="flex-1 text-xs border border-red-200 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete Task
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="flex-1 text-xs border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default KanbanPage;