import { useEffect, useState, useMemo } from "react";
import {
  DashboardHeader,
  SalesMetrics,
  TopProductsTable,
  TopSellersTable,
} from "../components/dashboard";
import {
  getEstadisticas,
  getVentasCrudas,
  regenerarDatos,
} from "../api/services/analytics";
import { getSales } from "../api/services/sales";

// ── Agrega registros crudos en las formas que necesitan los gráficos ──────────
function agregar(registros) {
  const vendedorMap = {};
  const mesMap = {};
  const productoMap = {};

  for (const r of registros) {
    // por vendedor
    const v = r.vendedor;
    if (!vendedorMap[v]) vendedorMap[v] = { vendorName: v, totalVentas: 0, totalMonto: 0 };
    vendedorMap[v].totalVentas += 1;
    vendedorMap[v].totalMonto  += r.total ?? 0;

    // por mes
    const mes = r.fecha ? String(r.fecha).slice(0, 7) : null;
    if (mes) {
      if (!mesMap[mes]) mesMap[mes] = { mes, totalVentas: 0, totalMonto: 0 };
      mesMap[mes].totalVentas += 1;
      mesMap[mes].totalMonto  += r.total ?? 0;
    }

    // por producto
    const p = r.producto;
    if (!productoMap[p]) productoMap[p] = { productName: p, cantidadVendida: 0, montoTotal: 0 };
    productoMap[p].cantidadVendida += r.cantidad ?? 0;
    productoMap[p].montoTotal      += r.total ?? 0;
  }

  return {
    ventasPorVendedor: Object.values(vendedorMap).sort((a, b) => b.totalMonto - a.totalMonto),
    ventasPorMes:      Object.values(mesMap).sort((a, b) => a.mes.localeCompare(b.mes)),
    productos:         Object.values(productoMap).sort((a, b) => b.cantidadVendida - a.cantidadVendida),
  };
}

// ── Helper para ventas reales de Spring Boot ──────────────────────────────────
function computeFromSales(sales) {
  const vendedorMap = {};
  const mesMap = {};
  const productoMap = {};

  for (const sale of sales) {
    const key = sale.vendorName || String(sale.vendorId);
    if (!vendedorMap[key]) vendedorMap[key] = { vendorName: key, totalVentas: 0, totalMonto: 0 };
    vendedorMap[key].totalVentas += 1;
    vendedorMap[key].totalMonto  += sale.total ?? 0;

    const mes = sale.saleDate ? sale.saleDate.slice(0, 7) : null;
    if (mes) {
      if (!mesMap[mes]) mesMap[mes] = { mes, totalVentas: 0, totalMonto: 0 };
      mesMap[mes].totalVentas += 1;
      mesMap[mes].totalMonto  += sale.total ?? 0;
    }

    for (const item of sale.items ?? []) {
      const p = item.productName;
      if (!productoMap[p]) productoMap[p] = { productName: p, cantidadVendida: 0, montoTotal: 0 };
      productoMap[p].cantidadVendida += item.quantity ?? 0;
      productoMap[p].montoTotal      += item.subtotal ?? 0;
    }
  }

  return {
    ventasPorVendedor: Object.values(vendedorMap).sort((a, b) => b.totalMonto - a.totalMonto),
    ventasPorMes:      Object.values(mesMap).sort((a, b) => a.mes.localeCompare(b.mes)),
    productos:         Object.values(productoMap).sort((a, b) => b.cantidadVendida - a.cantidadVendida),
    total:             sales.reduce((acc, s) => acc + (s.total ?? 0), 0),
  };
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function Dashboard() {
  const [tab, setTab] = useState("reales");

  // Ventas reales
  const [salesLoading, setSalesLoading] = useState(true);
  const [salesError,   setSalesError]   = useState(null);
  const [salesData,    setSalesData]    = useState([]);

  async function cargarVentasReales() {
    setSalesLoading(true); setSalesError(null);
    try { setSalesData(await getSales()); }
    catch { setSalesError("No se pudieron cargar las ventas reales."); }
    finally { setSalesLoading(false); }
  }

  // Analytics Python — guardamos los registros CRUDOS
  const [pyLoading,   setPyLoading]   = useState(true);
  const [pyError,     setPyError]     = useState(null);
  const [pyStats,     setPyStats]     = useState(null);
  const [pyRegistros, setPyRegistros] = useState([]); // registros limpios crudos
  const [regenerando, setRegenerando] = useState(false);

  // Filtros
  const [filtroVendedor, setFiltroVendedor] = useState("todos");
  const [filtroMes,      setFiltroMes]      = useState("todos");

  async function cargarPython() {
    setPyLoading(true); setPyError(null);
    try {
      const [stats, registros] = await Promise.all([
        getEstadisticas(),
        getVentasCrudas(),
      ]);
      setPyStats(stats);
      setPyRegistros(registros);
      setFiltroVendedor("todos");
      setFiltroMes("todos");
    } catch {
      setPyError("No se pudo conectar con el servidor Python. Asegúrate de que esté corriendo en http://localhost:5000");
    } finally {
      setPyLoading(false);
    }
  }

  useEffect(() => { cargarVentasReales(); cargarPython(); }, []);

  // Listas únicas para los selects
  const vendedoresUnicos = useMemo(() =>
    [...new Set(pyRegistros.map(r => r.vendedor))].sort(),
    [pyRegistros]
  );
  const mesesUnicos = useMemo(() =>
    [...new Set(pyRegistros.map(r => r.fecha ? String(r.fecha).slice(0, 7) : null).filter(Boolean))].sort(),
    [pyRegistros]
  );

  // Filtrar registros crudos PRIMERO, luego agregar
  const pyFiltrados = useMemo(() => {
    let rows = pyRegistros;
    if (filtroVendedor !== "todos") rows = rows.filter(r => r.vendedor === filtroVendedor);
    if (filtroMes      !== "todos") rows = rows.filter(r => r.fecha && String(r.fecha).slice(0, 7) === filtroMes);
    return rows;
  }, [pyRegistros, filtroVendedor, filtroMes]);

  const pyAgregado = useMemo(() => agregar(pyFiltrados), [pyFiltrados]);

  // Reales procesados
  const reales = useMemo(() => computeFromSales(salesData), [salesData]);

  const handleRegenerar = async () => {
    setRegenerando(true);
    try { await regenerarDatos(); await cargarPython(); }
    finally { setRegenerando(false); }
  };

  return (
    <section className="min-h-screen p-8 bg-gray-500 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          title="Dashboard"
          subtitle="Métricas de ventas reales y analytics simulados"
          backTo="/ventas"
        />

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: "reales",    label: "Ventas Reales" },
            { key: "simulados", label: "Analytics Simulados (Python)" },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-6 py-2 rounded-2xl text-sm font-semibold transition cursor-pointer ${
                tab === key ? "bg-white text-gray-800" : "bg-gray-600 text-gray-300 hover:bg-gray-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── TAB VENTAS REALES ── */}
        {tab === "reales" && (
          salesLoading ? <p className="text-gray-200">Cargando ventas reales...</p>
          : salesError ? (
            <div className="flex flex-col items-center gap-3 mt-10">
              <p className="text-red-400">{salesError}</p>
              <button onClick={cargarVentasReales} className="px-6 py-2 bg-white text-gray-800 rounded-xl font-semibold cursor-pointer">Reintentar</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Total ventas",    value: salesData.length },
                  { label: "Total facturado", value: `$${reales.total.toLocaleString("es-CO")}` },
                  { label: "Vendedores",      value: reales.ventasPorVendedor.length },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-600 rounded-2xl p-5">
                    <p className="text-gray-300 text-xs uppercase tracking-widest">{label}</p>
                    <p className="text-white text-2xl font-bold mt-1">{value}</p>
                  </div>
                ))}
              </div>
              <SalesMetrics ventasPorMes={reales.ventasPorMes} ventasPorVendedor={reales.ventasPorVendedor} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <TopProductsTable products={reales.productos.slice(0, 5).map(p => ({ id: p.productName, nombre: p.productName, unidades: p.cantidadVendida, ventas: p.montoTotal }))} />
                <TopSellersTable  sellers={reales.ventasPorVendedor.slice(0, 5).map(v => ({ id: v.vendorName, nombre: v.vendorName, ventas: v.totalVentas, total: v.totalMonto }))} />
              </div>
            </>
          )
        )}

        {/* ── TAB ANALYTICS SIMULADOS ── */}
        {tab === "simulados" && (
          pyLoading ? <p className="text-gray-200">Cargando analytics Python...</p>
          : pyError ? (
            <div className="flex flex-col items-center gap-3 mt-10">
              <p className="text-red-400 text-center max-w-md">{pyError}</p>
              <code className="text-gray-300 text-sm bg-gray-700 px-4 py-2 rounded-xl">python api.py</code>
              <button onClick={cargarPython} className="px-6 py-2 bg-white text-gray-800 rounded-xl font-semibold cursor-pointer">Reintentar</button>
            </div>
          ) : (
            <>
              {/* Stats globales */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Registros limpios",  value: pyStats?.totalVentas },
                  { label: "Total facturado",     value: `$${pyStats?.totalMonto?.toLocaleString("es-CO")}` },
                  { label: "Promedio por venta",  value: `$${pyStats?.promedioVenta?.toLocaleString("es-CO")}` },
                  { label: "Vendedores activos",  value: pyStats?.vendedoresUnicos },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-600 rounded-2xl p-5">
                    <p className="text-gray-300 text-xs uppercase tracking-widest">{label}</p>
                    <p className="text-white text-2xl font-bold mt-1">{value ?? "—"}</p>
                  </div>
                ))}
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap gap-4 mb-6 items-end">
                <div>
                  <label className="text-gray-300 text-xs uppercase tracking-widest block mb-1">Vendedor</label>
                  <select value={filtroVendedor} onChange={e => setFiltroVendedor(e.target.value)}
                    className="bg-gray-600 text-white text-sm px-4 py-2 rounded-xl focus:outline-none cursor-pointer">
                    <option value="todos">Todos</option>
                    {vendedoresUnicos.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-xs uppercase tracking-widest block mb-1">Mes</label>
                  <select value={filtroMes} onChange={e => setFiltroMes(e.target.value)}
                    className="bg-gray-600 text-white text-sm px-4 py-2 rounded-xl focus:outline-none cursor-pointer">
                    <option value="todos">Todos</option>
                    {mesesUnicos.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                {(filtroVendedor !== "todos" || filtroMes !== "todos") && (
                  <button onClick={() => { setFiltroVendedor("todos"); setFiltroMes("todos"); }}
                    className="text-xs text-gray-300 hover:text-white underline cursor-pointer pb-2">
                    Limpiar filtros
                  </button>
                )}
                <span className="text-gray-400 text-xs pb-2">
                  {pyFiltrados.length} registros encontrados
                </span>
              </div>

              {/* Cuando hay un vendedor filtrado, la torta muestra sus productos en vez de vendedores (evita 100% trivial) */}
              <SalesMetrics
                ventasPorMes={pyAgregado.ventasPorMes}
                ventasPorVendedor={
                  filtroVendedor !== "todos"
                    ? pyAgregado.productos.map(p => ({ vendorName: p.productName, totalMonto: p.montoTotal }))
                    : pyAgregado.ventasPorVendedor
                }
                pieLabel={filtroVendedor !== "todos" ? `Productos de ${filtroVendedor}` : "Ventas por vendedor"}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <TopProductsTable products={pyAgregado.productos.slice(0, 5).map(p => ({ id: p.productName, nombre: p.productName, unidades: p.cantidadVendida, ventas: p.montoTotal }))} />
                <TopSellersTable  sellers={pyAgregado.ventasPorVendedor.slice(0, 5).map(v => ({ id: v.vendorName, nombre: v.vendorName, ventas: v.totalVentas, total: v.totalMonto }))} />
              </div>

              <div className="flex justify-center mt-10">
                <button onClick={handleRegenerar} disabled={regenerando}
                  className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-2xl hover:bg-gray-100 transition cursor-pointer disabled:opacity-60 text-sm uppercase tracking-widest">
                  {regenerando ? "Regenerando..." : "Regenerar datos simulados"}
                </button>
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
}
