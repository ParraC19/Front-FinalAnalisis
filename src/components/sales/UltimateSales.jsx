import { useEffect, useState } from "react";
import RedirectLinks from "../RedirectLinks";
import { getSales } from "../../api/services/sales";

function UltimateSales({ refreshKey }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getSales();
        // Mostrar las 5 más recientes primero
        setSales([...data].reverse().slice(0, 5));
      } catch {
        setSales([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshKey]);

  return (
    <div className="p-4 justify-between flex flex-col h-full">
      <div>
        <h1 className="text-2xl mb-4 font-bold">Ventas Recientes</h1>
        {loading && (
          <p className="text-sm text-gray-400">Cargando ventas...</p>
        )}
        {!loading && sales.length === 0 && (
          <p className="text-sm text-gray-400">No hay ventas registradas aún.</p>
        )}
        <div className="flex flex-col gap-3">
          {sales.map((sale) => (
            <div key={sale.id} className="p-4 bg-gray-500 rounded-4xl">
              <div className="text-md text-gray-200 font-semibold">
                Venta #{sale.id} —{" "}
                {sale.items?.map((i) => `${i.productName} x${i.quantity}`).join(", ")}
              </div>
              <div className="text-sm text-gray-200">
                ${sale.total?.toLocaleString("es-CO")}
              </div>
              <div className="text-sm text-gray-200">{sale.vendorName}</div>
              <div className="text-sm text-gray-200">{sale.saleDate}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <RedirectLinks />
      </div>
    </div>
  );
}

export default UltimateSales;
