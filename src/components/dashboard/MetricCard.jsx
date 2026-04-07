function MetricCard({ title, value, borderColor = "" }) {
  const cardClass = borderColor
    ? `rounded-lg border border-gray-600 bg-gray-900 p-4 shadow ${borderColor}`
    : "rounded-lg border border-gray-600 bg-gray-900 p-4 shadow";

  return (
    <div className={cardClass}>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {title}
      </p>
      <p className="mt-1 text-2xl font-semibold text-gray-100">{value}</p>
    </div>
  );
}

export default MetricCard;
