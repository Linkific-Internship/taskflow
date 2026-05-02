import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import ProtectedRoute from './components/shared/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import KanbanPage from './pages/KanbanPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/kanban/:projectId" element={
              <ProtectedRoute>
                <KanbanPage />
              </ProtectedRoute>
            } />

            {/* Default */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;