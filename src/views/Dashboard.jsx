import { useEffect, useState } from "react";
import {
  DashboardHeader,
  SalesMetrics,
  TopProductsTable,
  TopSellersTable,
} from "../components/dashboard";
import { getSales } from "../api/services/sales";

function computeAnalytics(sales) {
  // Ventas por vendedor
  const vendedorMap = {};
  for (const sale of sales) {
    const key = sale.vendorId;
    if (!vendedorMap[key]) {
      vendedorMap[key] = {
        vendorId: sale.vendorId,
        vendorName: sale.vendorName,
        totalVentas: 0,
        totalMonto: 0,
      };
    }
    vendedorMap[key].totalVentas += 1;
    vendedorMap[key].totalMonto += sale.total ?? 0;
  }
  const ventasPorVendedor = Object.values(vendedorMap).sort(
    (a, b) => b.totalMonto - a.totalMonto
  );

  // Ventas por mes
  const mesMap = {};
  for (const sale of sales) {
    if (!sale.saleDate) continue;
    const mes = sale.saleDate.slice(0, 7); // "YYYY-MM"
    if (!mesMap[mes]) mesMap[mes] = { mes, totalVentas: 0, totalMonto: 0 };
    mesMap[mes].totalVentas += 1;
    mesMap[mes].totalMonto += sale.total ?? 0;
  }
  const ventasPorMes = Object.values(mesMap).sort((a, b) =>
    a.mes.localeCompare(b.mes)
  );

  // Productos más vendidos
  const productoMap = {};
  for (const sale of sales) {
    for (const item of sale.items ?? []) {
      const key = item.productId;
      if (!productoMap[key]) {
        productoMap[key] = {
          productId: item.productId,
          productName: item.productName,
          cantidadVendida: 0,
          montoTotal: 0,
        };
      }
      productoMap[key].cantidadVendida += item.quantity ?? 0;
      productoMap[key].montoTotal += item.subtotal ?? 0;
    }
  }
  const productosMasVendidos = Object.values(productoMap).sort(
    (a, b) => b.cantidadVendida - a.cantidadVendida
  );

  return { ventasPorVendedor, ventasPorMes, productosMasVendidos };
}

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [vendedoresTop, setVendedoresTop] = useState([]);
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [ventasPorVendedor, setVentasPorVendedor] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalMonto, setTotalMonto] = useState(0);

  useEffect(() => {
    async function loadAll() {
      try {
        const sales = await getSales();
        const { ventasPorVendedor, ventasPorMes, productosMasVendidos } =
          computeAnalytics(sales);

        setVentasPorVendedor(ventasPorVendedor);
        setVentasPorMes(ventasPorMes);

        setProductosMasVendidos(
          productosMasVendidos.slice(0, 5).map((p) => ({
            id: p.productId,
            nombre: p.productName,
            unidades: p.cantidadVendida,
            ventas: p.montoTotal,
          }))
        );

        setVendedoresTop(
          ventasPorVendedor.slice(0, 5).map((v) => ({
            id: v.vendorId,
            nombre: v.vendorName,
            ventas: v.totalVentas,
            total: v.totalMonto,
          }))
        );

        setTotalVentas(sales.length);
        setTotalMonto(sales.reduce((acc, s) => acc + (s.total ?? 0), 0));
      } catch (err) {
        console.error("Error cargando dashboard:", err);
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

        {/* Resumen general */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-600 rounded-2xl p-6">
            <p className="text-gray-300 text-sm uppercase tracking-widest">Total ventas</p>
            <p className="text-white text-3xl font-bold mt-1">{totalVentas}</p>
          </div>
          <div className="bg-gray-600 rounded-2xl p-6">
            <p className="text-gray-300 text-sm uppercase tracking-widest">Total facturado</p>
            <p className="text-white text-3xl font-bold mt-1">
              ${totalMonto.toLocaleString("es-CO")}
            </p>
          </div>
        </div>

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
