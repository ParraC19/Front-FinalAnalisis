import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function login(credentials) {
  return await apiClient.post(ENDPOINTS.LOGIN, credentials);
}

export async function register(userData) {
  return await apiClient.post(ENDPOINTS.USERS, userData);
}
