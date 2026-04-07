import React, { useMemo } from "react";

function ProductSearch({ query, setQuery, products, onSelect }) {
  const filtered = useMemo(() => {
    if (!query) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, products]);

  return (
    <div className="w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar producto..."
        className="
          border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white
        "
      />

      {filtered.length > 0 && (
        <ul className="mt-2 border rounded max-h-48 overflow-auto bg-white text-gray-700 shadow">
          {filtered.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                onSelect(product);
                setQuery(""); // limpiar input después de seleccionar
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-gray-500">${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductSearch;
