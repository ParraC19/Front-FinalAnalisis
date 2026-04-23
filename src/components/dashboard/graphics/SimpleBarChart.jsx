import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SimpleBarChart({ data = [] }) {
  const chartData = data.map((d) => ({
    name: d.mes,
    Monto: d.totalMonto,
    Ventas: d.totalVentas,
  }));

  return (
    <div className="w-full max-w-2xl h-[50%] flex justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#d1d5db", fontSize: 11 }} />
          <YAxis tick={{ fill: "#d1d5db", fontSize: 11 }} />
          <Tooltip
            formatter={(value, name) =>
              name === "Monto" ? `$${value.toLocaleString("es-CO")}` : value
            }
          />
          <Bar dataKey="Monto" fill="#8884d8" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Ventas" fill="#82ca9d" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
