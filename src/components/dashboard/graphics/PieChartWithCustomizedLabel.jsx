import { useState } from "react";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#a855f7", "#ec4899", "#f97316", "#14b8a6",
  "#ef4444", "#22d3ee",
];

const RADIAN = Math.PI / 180;

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (!percent || percent < 0.04) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x} y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartWithCustomizedLabel({ data = [] }) {
  const [hidden, setHidden] = useState(new Set());

  const allItems = data.map((d, i) => ({
    name: d.vendorName || d.name,
    value: d.totalMonto || d.value || 0,
    color: COLORS[i % COLORS.length],
  }));

  const visible = allItems.filter((d) => !hidden.has(d.name));

  const toggle = (name) => {
    setHidden((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={visible}
            dataKey="value"
            outerRadius={130}
            labelLine={false}
            label={renderLabel}
          >
            {visible.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString("es-CO")}`, "Monto"]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Leyenda interactiva */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {allItems.map((entry) => {
          const isHidden = hidden.has(entry.name);
          return (
            <button
              key={entry.name}
              onClick={() => toggle(entry.name)}
              className={`flex items-center gap-1.5 text-xs transition-opacity cursor-pointer ${
                isHidden ? "opacity-35" : "opacity-100"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-200">{entry.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
