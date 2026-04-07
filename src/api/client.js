const API_BASE_URL = "http://localhost:8080/api";

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw new Error(data?.message || "Error en la solicitud");
    }

    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
}

export const apiClient = {
  get: (endpoint, options = {}) =>
    request(endpoint, { method: "GET", ...options }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { method: "DELETE", ...options }),
};