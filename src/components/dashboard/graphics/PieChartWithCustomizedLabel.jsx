import { Pie, PieChart, Sector, Tooltip, Legend } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7", "#ec4899", "#f97316", "#14b8a6"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11}>
      {`${((percent || 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props) => (
  <Sector {...props} fill={COLORS[props.index % COLORS.length]} />
);

export default function PieChartWithCustomizedLabel({ data = [], isAnimationActive = true }) {
  const chartData = data.map((d) => ({
    name: d.vendorName || d.name,
    value: d.totalMonto || d.value || 0,
  }));

  return (
    <div className="w-full flex justify-center aspect-square h-[50%]">
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={isAnimationActive}
          shape={MyCustomPie}
        />
        <Tooltip formatter={(value) => `$${value.toLocaleString("es-CO")}`} />
        <Legend />
      </PieChart>
    </div>
  );
}
