import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 border px-4 py-3 rounded-lg text-sm font-medium shadow-sm ${colors[type]}`}>
      {message}
    </div>
  );
};

export default Toast;