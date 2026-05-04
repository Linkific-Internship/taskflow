import { useState, useMemo } from 'react';
import Layout from '../components/shared/Layout';
import { useProject } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/shared/Toast';
import useToast from '../hooks/useToast';

const Projects = () => {
  const { projects, addProject, deleteProject, getProjectTasks } = useProject();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [search, setSearch] = useState('');

  // Search filter
  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;
    return projects.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  const handleAdd = (e) => {
    e.preventDefault();
    setNameError('');

    // Validation
    if (!name.trim()) {
      setNameError('Project name is required');
      return;
    }
    if (name.trim().length < 3) {
      setNameError('Project name must be at least 3 characters');
      return;
    }

    addProject(name.trim(), description.trim());
    setName('');
    setDescription('');
    setShowModal(false);
    showToast('Project created successfully');
  };

  const handleDelete = (id, projectName) => {
    deleteProject(id);
    showToast(`"${projectName}" deleted`, 'error');
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
          <h2 className="text-xl font-bold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all your projects here.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          + New Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-400 text-sm">
            {search ? 'No projects match your search.' : 'No projects yet. Create your first project.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const projectTasks = getProjectTasks(project.id);
            const doneTasks = projectTasks.filter(
              (t) => t.status === 'done'
            ).length;

            return (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {project.name}
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  {project.description || 'No description'}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {projectTasks.length} tasks · {doneTasks} done
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/kanban/${project.id}`)}
                    className="flex-1 text-xs bg-gray-900 text-white py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Open Board
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              New Project
            </h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError('');
                  }}
                  placeholder="e.g. Website Redesign"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    nameError ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {nameError && (
                  <p className="text-xs text-red-500 mt-1">{nameError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Create Project
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setNameError('');
                    setName('');
                    setDescription('');
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
    </Layout>
  );
};

export default Projects;