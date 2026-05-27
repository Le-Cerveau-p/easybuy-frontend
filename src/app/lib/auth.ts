const AUTH_ROLE_KEY = "eazybuy-auth-role";

export type AuthRole = "user" | "admin";

export function getAuthRole(): AuthRole | null {
  if (typeof window === "undefined") {
    return null;
  }

  const role = window.localStorage.getItem(AUTH_ROLE_KEY);
  return role === "user" || role === "admin" ? role : null;
}

export function setAuthRole(role: AuthRole) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_ROLE_KEY, role);
}

export function clearAuthRole() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_ROLE_KEY);
}

export function isAdminSession() {
  return getAuthRole() === "admin";
}
