import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

function FormSale() {
  // 🔎 búsqueda
  const [query, setQuery] = useState("");

  // 📦 productos (mock inicial)
  const [products, setProducts] = useState([
    { id: 1, name: "Camisa Blanca", price: 80000 },
    { id: 2, name: "Pantalón Negro", price: 120000 },
    { id: 3, name: "Chaqueta Denim", price: 200000 },
    { id: 4, name: "kamiseta Básica", price: 50000 },
    { id: 5, name: "Tamiseta Básica", price: 50000 },
    { id: 6, name: "zamiseta Básica", price: 50000 },
    { id: 7, name: "pamiseta Básica", price: 50000 },
    { id: 8, name: "yamiseta Básica", price: 50000 },
    { id: 9, name: "lamiseta Básica", price: 50000 },
    { id: 10, name: "wamiseta Básica", price: 50000 },
  ]);

  // 🛒 carrito de ventas
  const [cart, setCart] = useState([]);

  // 🎯 selección de producto
  const onSelect = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        // si ya existe → aumenta cantidad
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      // si no existe → lo agrega
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <form
      action=""
      className="w-full h-full flex bg-gray-500 pb-4 text-gray-200"
    >
      <div className=" w-1/2 h-full p-4">
        <div className="h-full flex flex-col gap-1 p-4">
          <h2 className="text-3xl font-bold text-gray-200">
            Formulario de Venta
          </h2>
          <div className="h-full p-4 flex flex-col gap-6">
            <div className="">
              <label className="font-semibold text-sm  pb-1 block">
                Codigo de vendedor
              </label>
              <input
                type="text"
                className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white"
                placeholder="Codigo de vendedor"
              />
            </div>
            <div>
              <label className="font-semibold text-sm  pb-1 block">
                Nombre vendedor
              </label>
              <p className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white">
                Nicolas Parra
              </p>
            </div>
            <div className="">
              <label className="font-semibold text-sm pb-1 block">
                Fecha de venta
              </label>
              <input
                type="date"
                className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-300 pb-1 block">
                Dirección
              </label>
              <input
                type="text"
                className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white"
                placeholder="Dirección"
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-300 pb-1 block">
                Marca
              </label>
              <select className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white">
                <option value="" className="text-gray-600">
                  Seleccione
                </option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-300 pb-1 block">
                Producto
              </label>
              <ProductSearch
                query={query}
                setQuery={setQuery}
                products={products}
                onSelect={onSelect}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="font-bold text-lg bg-gray-200 hover:bg-gray-100 p-4 w-[80%] text-gray-900 rounded-4xl hover:scale-[1.05] transition duration-200 cursor-pointer">
              REALIZAR VENTA
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full p-8 pb-0 flex flex-col gap-2 text-gray-900">
        <div className="bg-gray-200 w-full h-2/3 rounded-t-4xl">
          <ProductList cart={cart} setCart={setCart} />
        </div>
        <div className="bg-gray-200 w-full h-1/3 p-4 px-5 gap-4 flex flex-col justify-between rounded-b-4xl">
          <div className="flex justify-between items-center h-[10%]">
            <h3 className="text-lg font-semibold ">Resumen de Venta</h3>
            <span className="text-sm">2026/03/23</span>
          </div>
          <div className="overflow-auto max-h-[40%] min-h-[40%]">
            <p>{cart.map((item) => item.name).join(", ")}</p>
          </div>
          <div className="flex justify-between items-center h-[10%]">
            <p>Cantidad de productos</p>
            <p>{cart.length}</p>
          </div>
          <div className="flex justify-between items-center h-[20%] py-2 border-t-2">
            <p>Total</p>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormSale;
