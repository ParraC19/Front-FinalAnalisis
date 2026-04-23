import { useEffect, useState } from "react";
import {
  DashboardHeader,
  OrderMetrics,
  SalesMetrics,
  TopProductsTable,
  TopSellersTable,
} from "../components/dashboard";
import {
  getResumen,
  getVentasPorVendedor,
  getVentasPorMes,
  getProductosMasVendidos,
} from "../api/services/analytics";
import { getOrders } from "../api/services/orders";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [ordenesMetricas, setOrdenesMetricas] = useState({
    cancelados: 0,
    exitosos: 0,
    enProceso: 0,
  });

  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [vendedoresTop, setVendedoresTop] = useState([]);
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [ventasPorVendedor, setVentasPorVendedor] = useState([]);

  useEffect(() => {
    async function loadAll() {
      try {
        const [productos, vendedores, porMes, porVendedor, ordenes] =
          await Promise.all([
            getProductosMasVendidos(),
            getVentasPorVendedor(),
            getVentasPorMes(),
            getVentasPorVendedor(),
            getOrders(),
          ]);

        // Mapear productos al formato que espera TopProductsTable
        setProductosMasVendidos(
          productos.slice(0, 5).map((p) => ({
            id: p.productId,
            nombre: p.productName,
            unidades: p.cantidadVendida,
            ventas: p.montoTotal,
          }))
        );

        // Mapear vendedores al formato que espera TopSellersTable
        setVendedoresTop(
          vendedores.slice(0, 5).map((v) => ({
            id: v.vendorId,
            nombre: v.vendorName,
            ventas: v.totalVentas,
            total: v.totalMonto,
          }))
        );

        setVentasPorMes(porMes);
        setVentasPorVendedor(porVendedor);

        // Contar órdenes por estado
        const cancelados = ordenes.filter((o) => o.status === "CANCELADO").length;
        const exitosos = ordenes.filter((o) => o.status === "CONFIRMADO").length;
        const enProceso = ordenes.filter((o) => o.status === "PENDIENTE").length;
        setOrdenesMetricas({ cancelados, exitosos, enProceso });
      } catch (err) {
        console.error("Error cargando analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  if (loading) {
    return (
      <section className="h-screen p-8 bg-gray-500 flex items-center justify-center">
        <p className="text-gray-200 text-lg">Cargando dashboard...</p>
      </section>
    );
  }

  return (
    <section className="h-screen p-8 sm:px-6 lg:px-8 bg-gray-500 overflow-y-auto">
      <div className="max-w-7xl mx-auto h-full">
        <DashboardHeader
          title="Dashboard"
          subtitle="Métricas de ventas, pedidos y desempeño"
          backTo="/ventas"
        />

        <OrderMetrics
          cancelados={ordenesMetricas.cancelados}
          exitosos={ordenesMetricas.exitosos}
          enProceso={ordenesMetricas.enProceso}
        />

        <SalesMetrics
          ventasPorMes={ventasPorMes}
          ventasPorVendedor={ventasPorVendedor}
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
