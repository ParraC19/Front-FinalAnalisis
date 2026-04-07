import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function getProducts() {
  return await apiClient.get(ENDPOINTS.PRODUCTS);
}

export async function getProductById(productId) {
  return await apiClient.get(`${ENDPOINTS.PRODUCTS}/${productId}`);
}