import React from 'react'

function ProductList({ cart, setCart }) {
    const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  return (
    <div className="w-full  rounded p-4 overflow-auto max-h-full ">
      <h2 className="font-semibold text-lg mb-3">Productos seleccionados</h2>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">No hay productos agregados</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  ${item.price} x {item.qty}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item.id, Number(e.target.value))
                  }
                  className="w-16 border rounded p-1 text-sm"
                />

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductList