import PieChartWithCustomizedLabel from "./graphics/PieChartWithCustomizedLabel";
import SimpleBarChart from "./graphics/SimpleBarChart";

function SalesMetrics({ ventasPorMes = [], ventasPorVendedor = [] }) {
  return (
    <section className="mb-16 h-[36%]">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Métricas de ventas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        <PieChartWithCustomizedLabel data={ventasPorVendedor} />
        <SimpleBarChart data={ventasPorMes} />
      </div>
    </section>
  );
}

export default SalesMetrics;
