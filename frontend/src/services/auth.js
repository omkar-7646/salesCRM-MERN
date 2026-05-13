import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export function getAuthToken() {
  const cookieToken = Cookies.get(TOKEN_KEY);

  if (cookieToken) {
    return cookieToken;
  }

  const storedToken = localStorage.getItem(TOKEN_KEY);

  if (storedToken) {
    setAuthToken(storedToken);
    localStorage.removeItem(TOKEN_KEY);
  }

  return storedToken;
}

export function setAuthToken(token) {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    sameSite: "strict",
    path: "/",
  });
}

export function clearAuthToken() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function isAdmin() {
  return getCurrentUser()?.role === "admin";
}
