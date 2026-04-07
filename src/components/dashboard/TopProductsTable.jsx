function TopProductsTable({ products = [] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Productos más vendidos
      </h2>
      <div className="rounded-lg border border-gray-600 bg-gray-900 overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600 text-left text-gray-400">
                <th className="py-3 px-2">Producto</th>
                <th className="py-3 px-2 text-right">Unidades</th>
                <th className="py-3 px-2 text-right">Ventas</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-700/50 hover:bg-neutral-700/30 text-gray-200"
                >
                  <td className="py-3 px-2">{p.nombre}</td>
                  <td className="py-3 px-2 text-right">{p.unidades}</td>
                  <td className="py-3 px-2 text-right">
                    ${p.ventas.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TopProductsTable;
