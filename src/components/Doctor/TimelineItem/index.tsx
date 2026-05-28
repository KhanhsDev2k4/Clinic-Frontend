const TimelineItem: React.FC<{
  icon: React.ReactNode;
  year: string;
  title: string;
  subtitle: string;
  isLast: boolean;
  color: 'blue' | 'green';
}> = ({ icon, year, title, subtitle, isLast, color }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </div>
      {!isLast && <div className={`w-0.5 h-full bg-${color}-200 my-2`} />}
    </div>
    <div className="flex-1 pb-8">
      <div className={`text-sm text-${color}-600 font-semibold mb-1`}>{year}</div>
      <div className="font-bold text-gray-900 text-lg mb-1">{title}</div>
      <div className="text-gray-600">{subtitle}</div>
    </div>
  </div>
);

export default TimelineItem;
