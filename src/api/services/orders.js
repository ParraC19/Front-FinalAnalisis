import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function getOrders() {
  return await apiClient.get(ENDPOINTS.ORDERS);
}
