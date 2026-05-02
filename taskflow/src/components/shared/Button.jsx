const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50';
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-700',
    secondary: 'border border-gray-300 text-gray-600 hover:bg-gray-50',
    danger: 'border border-red-200 text-red-500 hover:bg-red-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;