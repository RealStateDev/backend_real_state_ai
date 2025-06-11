export default async function createChatService(userId: number) {
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
    return data.data.id;
  } catch (error) {
    console.error(error)
  }
}
