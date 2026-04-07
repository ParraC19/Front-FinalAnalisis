import MetricCard from "./MetricCard";

function OrderMetrics({ cancelados = 0, exitosos = 0, enProceso = 0 }) {
  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Estado de pedidos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Exitosos"
          value={exitosos}
          borderColor="border-green-500/50"
        />
        <MetricCard
          title="En proceso"
          value={enProceso}
          borderColor="border-amber-500/50"
        />
        <MetricCard
          title="Cancelados"
          value={cancelados}
          borderColor="border-red-500/50"
        />
      </div>
      
    </section>
  );
}

export default OrderMetrics;
