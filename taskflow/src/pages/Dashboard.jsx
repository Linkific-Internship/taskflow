import Layout from '../components/shared/Layout';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

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

  const chartData = [
    { name: 'To Do', value: todoTasks, color: '#6b7280' },
    { name: 'In Progress', value: inProgressTasks, color: '#f59e0b' },
    { name: 'Done', value: doneTasks, color: '#10b981' },
  ];

  const priorityData = [
    { name: 'High', value: tasks.filter((t) => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: tasks.filter((t) => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: tasks.filter((t) => t.priority === 'low').length, color: '#10b981' },
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
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        {/* Tasks by Status */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Tasks by Status</h3>
          {totalTasks === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No tasks yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barSize={40}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Tasks by Priority */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Tasks by Priority</h3>
          {totalTasks === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No tasks yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={priorityData} barSize={40}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Tasks</h3>
        {recentTasks.length === 0 ? (
          <p className="text-sm text-gray-400">No tasks yet. Create a project and add tasks.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{task.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {task.dueDate ? `Due: ${task.dueDate}` : 'No due date'}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  task.status === 'done'
                    ? 'bg-green-100 text-green-700'
                    : task.status === 'inprogress'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {task.status === 'inprogress' ? 'In Progress' : task.status === 'done' ? 'Done' : 'To Do'}
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