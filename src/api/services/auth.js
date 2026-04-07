import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function login(credentials) {
  return await apiClient.post(ENDPOINTS.LOGIN, credentials);
}