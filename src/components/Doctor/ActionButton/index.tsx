const ActionButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}> = ({ onClick, icon, variant = 'secondary', children }) => {
  const baseClass = 'px-6 py-3 rounded-full font-bold transition flex items-center gap-2';
  const variantClass =
    variant === 'primary'
      ? 'bg-white text-blue-600 hover:bg-blue-50'
      : 'bg-white/20 backdrop-blur text-white hover:bg-white/30';

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass}`}>
      {icon}
      {children}
    </button>
  );
};

export default ActionButton;
