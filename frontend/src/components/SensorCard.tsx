interface ISensorCard {
  title: string;
  value: string | number;
  unit: string;
  category?: string;
}

const SensorCard = ({ title, value, unit, category }: ISensorCard) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-md flex-1 min-w-[200px] m-4">
      <h2 className="mt-0 text-gray-700 text-lg font-semibold">{title}</h2>

      <div className="text-2xl font-bold text-blue-600">
        {value || "--"} <span className="text-gray-600">{unit}</span>
      </div>
      {category && <div className="text-gray-600">{category}</div>}
    </div>
  );
};

export default SensorCard;
