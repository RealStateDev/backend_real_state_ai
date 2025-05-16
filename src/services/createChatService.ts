import { Usertype } from "@/types/generalTypes";

export default async function createChatService(userId: number) {
  /*const res = await fetch("http://localhost:5000/api/chats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({usuario_id:userId}),
  });

  // Si falla, leemos el JSON para obtener el mensaje del servidor
  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.message || "Error interno del servidor");
  }

  return res.json();*/
  try {
    const resp = await fetch('http://localhost:5000/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({usuario_id:userId}),
    }
    )
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data || "Error interno del servidor");
    }
    return data;
  } catch (error) {
    console.error(error)
  }
}
