import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function getSales() {
  return await apiClient.get(ENDPOINTS.SALES);
}

export async function createSale(saleData) {
  return await apiClient.post(ENDPOINTS.SALES, saleData);
}