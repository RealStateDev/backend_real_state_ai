import { ChatMessage } from "@/types/generalTypes";

export default async function addMessageService(chatId: number, contenido: string, tipo: "usuario" | "bot") {
    try {
        const res = await fetch(`http://localhost:5000/api/chats/${chatId}/mensajes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contenido, tipo })
        });
        // Si falla, leemos el JSON para obtener el mensaje del servidor
        if (!res.ok) {
            const errJson = await res.json().catch(() => ({}));
            throw new Error(errJson.message || "Contenido y tipo son requeridos");
        }
        return res.json();

    } catch (error) {
        console.error(error)
    }
}
