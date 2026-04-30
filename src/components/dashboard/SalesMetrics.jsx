import PieChartWithCustomizedLabel from "./graphics/PieChartWithCustomizedLabel";
import SimpleBarChart from "./graphics/SimpleBarChart";

function SalesMetrics({ ventasPorMes = [], ventasPorVendedor = [], pieLabel = "Ventas por vendedor" }) {
  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Métricas de ventas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{pieLabel}</p>
          <PieChartWithCustomizedLabel data={ventasPorVendedor} />
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Ventas por mes</p>
          <SimpleBarChart data={ventasPorMes} />
        </div>
      </div>
    </section>
  );
}

export default SalesMetrics;
