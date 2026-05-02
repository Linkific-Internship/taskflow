import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold text-gray-900">TaskFlow</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          {currentUser?.name}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;