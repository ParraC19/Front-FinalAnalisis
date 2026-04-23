import { apiClient } from "../client";

export async function getResumen() {
  return await apiClient.get("/analytics/resumen");
}

export async function getVentasPorVendedor() {
  return await apiClient.get("/analytics/ventas-por-vendedor");
}

export async function getVentasPorMes() {
  return await apiClient.get("/analytics/ventas-por-mes");
}

export async function getProductosMasVendidos() {
  return await apiClient.get("/analytics/productos-mas-vendidos");
}
