function TopSellersTable({ sellers = [] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Vendedores que más venden
      </h2>
      <div className="rounded-lg border border-gray-600 bg-gray-900 overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600 text-left text-gray-400">
                <th className="py-3 px-2">Vendedor</th>
                <th className="py-3 px-2 text-right">Pedidos</th>
                <th className="py-3 px-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-gray-700/50 hover:bg-neutral-700/30 text-gray-200"
                >
                  <td className="py-3 px-2">{v.nombre}</td>
                  <td className="py-3 px-2 text-right">{v.ventas}</td>
                  <td className="py-3 px-2 text-right">
                    ${v.total.toLocaleString()}
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

export default TopSellersTable;
