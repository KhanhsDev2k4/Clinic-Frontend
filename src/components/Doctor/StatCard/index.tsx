const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({
  icon,
  value,
  label,
}) => (
  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <div className="text-sm text-blue-100">{label}</div>
  </div>
);

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

export default StatCard;
