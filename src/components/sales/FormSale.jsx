import { useState } from "react";
import Swal from "sweetalert2";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import { useProducts } from "../../hooks/useProducts";
import { useAuth } from "../../hooks/useAuth";
import { createSale } from "../../api/services/sales";

const TIENDAS = [
  "AMERICANINO",
  "CHEVIGNON",
  "RIFLE",
  "NAF_NAF",
  "ESPRIT",
  "AMERICAN_EAGLE",
  "MANGO",
  "CARRERA",
];

function FormSale({ onSaleCreated }) {
  const { user } = useAuth();
  const { products, loadingProducts, productsError } = useProducts();

  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split("T")[0]);
  const [saleType, setSaleType] = useState("LOCAL");
  const [tienda, setTienda] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSelect = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setSubmitError("Agrega al menos un producto a la venta.");
      return;
    }
    if (saleType === "LOCAL" && !tienda) {
      setSubmitError("Selecciona una tienda para ventas locales.");
      return;
    }
    if (saleType === "DOMICILIO" && !address.trim()) {
      setSubmitError("La dirección es requerida para ventas a domicilio.");
      return;
    }

    setSubmitting(true);

    const payload = {
      vendorId: user.id,
      saleType,
      tienda: saleType === "LOCAL" ? tienda : null,
      address: saleType === "DOMICILIO" ? address.trim() : null,
      saleDate,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.qty,
      })),
    };

    try {
      await createSale(payload);
      setCart([]);
      setAddress("");
      setTienda("");
      onSaleCreated?.();
      Swal.fire({
        icon: "success",
        title: "¡Venta registrada!",
        text: "La venta fue registrada exitosamente.",
        confirmButtonColor: "#4b5563",
        confirmButtonText: "Aceptar",
        borderRadius: "1.5rem",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: err.message || "No se pudo registrar la venta. Intenta de nuevo.",
        confirmButtonColor: "#4b5563",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex bg-gray-500 pb-4 text-gray-200"
    >
      <div className="w-1/2 h-full p-4">
        <div className="h-full flex flex-col gap-1 p-4">
          <h2 className="text-3xl font-bold text-gray-200">
            Formulario de Venta
          </h2>
          <div className="h-full p-4 flex flex-col gap-6">
            <div>
              <label className="font-semibold text-sm pb-1 block">
                Código de vendedor
              </label>
              <p className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent">
                {user?.vendorCode || "—"}
              </p>
            </div>
            <div>
              <label className="font-semibold text-sm pb-1 block">
                Nombre vendedor
              </label>
              <p className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent">
                {user?.name || "—"}
              </p>
            </div>
            <div>
              <label className="font-semibold text-sm pb-1 block">
                Fecha de venta
              </label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:outline-none caret-white"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-sm pb-1 block">
                Tipo de venta
              </label>
              <select
                value={saleType}
                onChange={(e) => {
                  setSaleType(e.target.value);
                  setTienda("");
                  setAddress("");
                }}
                className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-gray-500 focus:outline-none"
              >
                <option value="LOCAL">Local</option>
                <option value="DOMICILIO">Domicilio</option>
              </select>
            </div>
            {saleType === "LOCAL" && (
              <div>
                <label className="font-semibold text-sm pb-1 block">
                  Tienda
                </label>
                <select
                  value={tienda}
                  onChange={(e) => setTienda(e.target.value)}
                  className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-gray-500 focus:outline-none"
                  required
                >
                  <option value="">Selecciona una tienda</option>
                  {TIENDAS.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {saleType === "DOMICILIO" && (
              <div>
                <label className="font-semibold text-sm text-gray-300 pb-1 block">
                  Dirección
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:outline-none caret-white focus:placeholder-transparent"
                  placeholder="Dirección de entrega"
                  required
                />
              </div>
            )}
            <div>
              <label className="font-semibold text-sm text-gray-300 pb-1 block">
                Buscar producto
              </label>
              {loadingProducts && (
                <p className="text-sm text-gray-300">Cargando productos...</p>
              )}
              {productsError && (
                <p className="text-sm text-red-400">{productsError}</p>
              )}
              {!loadingProducts && !productsError && (
                <ProductSearch
                  query={query}
                  setQuery={setQuery}
                  products={products}
                  onSelect={onSelect}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="font-bold text-lg bg-gray-200 hover:bg-gray-100 p-4 w-[80%] text-gray-900 rounded-4xl hover:scale-[1.05] transition duration-200 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "REGISTRANDO..." : "REALIZAR VENTA"}
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
            <h3 className="text-lg font-semibold">Resumen de Venta</h3>
            <span className="text-sm">{saleDate}</span>
          </div>
          <div className="overflow-auto max-h-[40%] min-h-[40%]">
            <p>{cart.map((item) => `${item.name} x${item.qty}`).join(", ")}</p>
          </div>
          <div className="flex justify-between items-center h-[10%]">
            <p>Cantidad de productos</p>
            <p>{cart.reduce((acc, item) => acc + item.qty, 0)}</p>
          </div>
          <div className="flex justify-between items-center h-[20%] py-2 border-t-2">
            <p>Total</p>
            <span>${total.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormSale;
