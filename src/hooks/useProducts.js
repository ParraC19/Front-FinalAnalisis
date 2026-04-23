import { useEffect, useState } from "react";
import { getProducts } from "../api/services/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true);
      setProductsError(null);

      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setProductsError(error.message || "No se pudieron cargar los productos");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  return {
    products,
    loadingProducts,
    productsError,
  };
}
