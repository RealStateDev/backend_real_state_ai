import { Usertype } from "@/types/generalTypes";

export default async function loginUserClientService(user: Usertype) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: user.email, password: user.password }),
  });

  // Si falla, leemos el JSON para obtener el mensaje del servidor
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.message || "Credenciales incorrectas");
  }

  return res.json();     
}
