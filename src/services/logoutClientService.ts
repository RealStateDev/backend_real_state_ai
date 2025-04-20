// src/services/logoutClientService.ts
export default async function logoutClientService() {
  const res = await fetch("/api/logout", { method: "POST" });
  if (!res.ok) throw new Error("No se pudo cerrar sesión");
  return res.json();
}
