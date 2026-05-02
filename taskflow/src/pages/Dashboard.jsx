import Layout from '../components/shared/Layout';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { projects, tasks } = useProject();

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === 'inprogress').length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;

  const stats = [
    { label: 'Total Projects', value: projects.length },
    { label: 'Total Tasks', value: totalTasks },
    { label: 'To Do', value: todoTasks },
    { label: 'In Progress', value: inProgressTasks },
    { label: 'Done', value: doneTasks },
  ];

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Welcome back, {currentUser?.name} 👋
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Recent Tasks
        </h3>
        {recentTasks.length === 0 ? (
          <p className="text-sm text-gray-400">
            No tasks yet. Create a project and add tasks.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task.status === 'done'
                      ? 'bg-green-100 text-green-700'
                      : task.status === 'inprogress'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {task.status === 'inprogress'
                    ? 'In Progress'
                    : task.status === 'done'
                    ? 'Done'
                    : 'To Do'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;