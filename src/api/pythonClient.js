const PYTHON_BASE_URL = "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const config = {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  };
  try {
    const response = await fetch(`${PYTHON_BASE_URL}${endpoint}`, config);
    const contentType = response.headers.get("content-type");
    const data =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    if (!response.ok) throw new Error(data?.message || "Error en analytics");
    return data;
  } catch (error) {
    console.error("PYTHON API ERROR:", error);
    throw error;
  }
}

export const pythonClient = {
  get:  (endpoint, options = {}) => request(endpoint, { method: "GET", ...options }),
  post: (endpoint, options = {}) => request(endpoint, { method: "POST", ...options }),
};
