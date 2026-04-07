import { useState } from "react";
import {
  DashboardHeader,
  OrderMetrics,
  SalesMetrics,
  TopProductsTable,
  TopSellersTable,
} from "../components/dashboard";

function Dashboard() {
  const [pedidosMetricas] = useState({
    cancelados: 12,
    exitosos: 156,
    enProceso: 8,
  });

  const [productosMasVendidos] = useState([
    { id: 1, nombre: "Producto A", unidades: 340, ventas: 12500 },
    { id: 2, nombre: "Producto B", unidades: 280, ventas: 9800 },
    { id: 3, nombre: "Producto C", unidades: 195, ventas: 7200 },
  ]);

  const [vendedoresTop] = useState([
    { id: 1, nombre: "María García", ventas: 45, total: 18900 },
    { id: 2, nombre: "Carlos López", ventas: 38, total: 15200 },
    { id: 3, nombre: "Ana Martínez", ventas: 32, total: 13400 },
  ]);

  const [ventasMetricas] = useState({
    totalHoy: 12500,
    totalMes: 187000,
    ticketPromedio: 420,
  });

  return (
    <section className="h-screen p-8 sm:px-6 lg:px-8 bg-gray-500">
      <div className="max-w-7xl mx-auto h-full">
        <DashboardHeader
          title="Dashboard"
          subtitle="Métricas de ventas, pedidos y desempeño"
          backTo="/ventas"
        />

        <OrderMetrics
          cancelados={pedidosMetricas.cancelados}
          exitosos={pedidosMetricas.exitosos}
          enProceso={pedidosMetricas.enProceso}
        />

        <SalesMetrics
          totalHoy={ventasMetricas.totalHoy}
          totalMes={ventasMetricas.totalMes}
          ticketPromedio={ventasMetricas.ticketPromedio}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopProductsTable products={productosMasVendidos} />
          <TopSellersTable sellers={vendedoresTop} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
