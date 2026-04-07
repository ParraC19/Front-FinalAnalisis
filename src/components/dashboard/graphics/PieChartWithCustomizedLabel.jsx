import { Pie, PieChart, Sector } from "recharts";
// ⚠️ opcional: esto solo sirve en desarrollo
// import { RechartsDevtools } from "@recharts/devtools";

// #region Sample data
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
// #endregion

const RADIAN = Math.PI / 180;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// 🔹 Label personalizado
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (
    cx == null ||
    cy == null ||
    innerRadius == null ||
    outerRadius == null
  ) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent || 0) * 100).toFixed(0)}%`}
    </text>
  );
};

// 🔹 Sector personalizado
const MyCustomPie = (props) => {
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
    />
  );
};

// 🔹 Componente principal
export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
}) {
  return (
    <div className="w-full flex justify-center aspect-square h-[50%]">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={isAnimationActive}
          shape={MyCustomPie}
        />
      </PieChart>

      {/* opcional */}
      {/* <RechartsDevtools /> */}
    </div>
  );
}