/*export interface SendChatAnswerResponse {
  code: number;
  message: string;
  data: {
    userMessage: {
      id: number;
      chat_id: number;
      contenido: string;
      tipo: "usuario";
      fecha: string;
    };
    botMessage: {
      id: number;
      chat_id: number;
      contenido: string;
      tipo: "bot";
      fecha: string;
    };
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    } | null;
  };
}

export default async function sendChatAndGetAnswerService(chatId: number, contenido: string) {
  const res = await fetch(`http://localhost:4000/api/chats/${chatId}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contenido })
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.message || "Error enviando mensaje");
  }

  const json = (await res.json()) as SendChatAnswerResponse;
  return json.data;
}
*/
//BKP
export interface SendChatAnswerResponse {
  code: number;
  message: string;
  data: {
    userMessage: {
      id: number;
      chat_id: number;
      contenido: string;
      tipo: "usuario";
      fecha: string;
    };
    botMessage: {
      id: number;
      chat_id: number;
      contenido: string;
      tipo: "bot";
      fecha: string;
    };
    propertiesPayload?: {
      id: number;
      titulo: string;
      precio: number;
      ciudad?: string;
      zona?: string;
      tipo_propiedad?: string;
      trans_type?: string;
      dormitorios?: number;
      banos?: number;
      garajes?: number;
      url?: string;
      image_url?: string;
    }[];  // <-- NUEVO
    sql?: string;
    rowCount?: number;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    } | null;
  };
}

export default async function sendChatAndGetAnswerService(
  chatId: number,
  contenido: string
) {
  const res = await fetch(`http://localhost:4000/api/chats/${chatId}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contenido })
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson.message || "Error enviando mensaje");
  }

  const json = (await res.json()) as SendChatAnswerResponse;
  return json.data; // ahora incluye propertiesPayload si viene
}
