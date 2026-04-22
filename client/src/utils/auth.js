export const getToken = () => localStorage.getItem("token");

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
};

export const getUserRole = () => {
  const user = getStoredUser();
  return user?.role || "user";
};

export const isAdmin = () => getUserRole() === "admin";

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
