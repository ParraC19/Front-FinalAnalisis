const STORAGE_KEY = "registered_users";

export const CREDENTIALS = [
  { email: "admin@metricsales.com", password: "admin123" },
];

function getRegisteredUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function validateCredentials(email, password) {
  const all = [...CREDENTIALS, ...getRegisteredUsers()];
  return all.some((c) => c.email === email && c.password === password);
}

export function registerUser(email, password) {
  const users = getRegisteredUsers();
  if (users.some((u) => u.email === email)) return false;
  users.push({ email, password });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return true;
}
