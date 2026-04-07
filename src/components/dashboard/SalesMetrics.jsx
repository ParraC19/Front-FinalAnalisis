import PieChartWithCustomizedLabel from "./graphics/PieChartWithCustomizedLabel";
import SimpleBarChart from "./graphics/SimpleBarChart";
import MetricCard from "./MetricCard";

function SalesMetrics({
  totalHoy = 0,
  totalMes = 0,
  ticketPromedio = 0,
}) {
  return (
    <section className="mb-16 h-[36%]">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Métricas de ventas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        <PieChartWithCustomizedLabel/>
        <SimpleBarChart/>
      </div>
    </section>
  );
}

export default SalesMetrics;
