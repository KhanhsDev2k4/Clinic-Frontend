interface TimeSlot {
  time: string;
  available: boolean;
}

export const TimeSlotPicker: React.FC<{
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (time: string) => void;
}> = ({ slots, selectedSlot, onSelectSlot }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {slots.map((slot, i) => (
        <button
          key={i}
          disabled={!slot.available}
          onClick={() => slot.available && onSelectSlot(slot.time)}
          className={`py-3 px-4 rounded-lg text-sm font-semibold transition ${
            selectedSlot === slot.time
              ? 'bg-blue-600 text-white'
              : slot.available
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};
