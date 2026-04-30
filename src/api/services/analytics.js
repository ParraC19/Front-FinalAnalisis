import { pythonClient } from "../pythonClient";

export async function getEstadisticas() {
  return await pythonClient.get("/estadisticas");
}

export async function getVentasPorVendedor() {
  return await pythonClient.get("/ventas-por-vendedor");
}

export async function getVentasPorMes() {
  return await pythonClient.get("/ventas-por-mes");
}

export async function getProductosMasVendidos() {
  return await pythonClient.get("/productos-mas-vendidos");
}

export async function getVentasCrudas() {
  return await pythonClient.get("/ventas-limpias");
}

export async function regenerarDatos() {
  return await pythonClient.post("/regenerar");
}
