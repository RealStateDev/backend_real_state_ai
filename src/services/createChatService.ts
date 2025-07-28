export default async function createChatService(userId: number) {
  try {
    const resp = await fetch("http://localhost:4000/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id: userId }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.message || "Error interno del servidor");
    }

    // La API retorna la información completa del chat recién creado
    return data.data;
  } catch (error) {
    console.error(error)
  }
}
