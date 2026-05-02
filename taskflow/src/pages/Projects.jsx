import { useState } from 'react';
import Layout from '../components/shared/Layout';
import { useProject } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const { projects, addProject, deleteProject, getProjectTasks } = useProject();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addProject(name.trim(), description.trim());
    setName('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <Layout>
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

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-400 text-sm">
            No projects yet. Create your first project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
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
                    onClick={() => deleteProject(project.id)}
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
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Website Redesign"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
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
                  onClick={() => setShowModal(false)}
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