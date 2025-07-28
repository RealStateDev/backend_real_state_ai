export default async function deleteChat(id: number) {

    try {
        const res = await fetch(`http://localhost:4000/api/chats/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error("Error al realizar el delete del chat");
        }

        /*const data = await res.json();
        return data;*/
        // Aquí devolvemos TODO el JSON
        return res.json() as Promise<{
            code: number;
            message: string;
            deletedData: { id: number; usuario_id: any; fecha: string };
        }>;

    } catch (error: any) {
        console.error(error);
    }
}