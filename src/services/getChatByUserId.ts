
export default async function getChatByUserId(userId: number) {
 
  try {
    const res = await fetch(`http://localhost:4000/api/chatsByUser/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        throw new Error("Error al obtener todos los chats");
      }
      
      const data = await res.json();
      return data;

  } catch (error: any) {
    console.error(error);
  }
}