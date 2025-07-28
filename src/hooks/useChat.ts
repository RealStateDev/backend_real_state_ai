'use client';
import { useState } from 'react';
import { ChatMessage } from '@/types/generalTypes';
import { IntentPayload } from '@/types/intent';
import { sendMessage } from '@/services/chat';
import sendIntent from '@/services/sendIntent';

export default function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [pendingIntent, setPendingIntent] = useState<IntentPayload | null>(null);
  const [intentNotice, setIntentNotice] = useState<string | null>(null);

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMsg: ChatMessage = { sender: 'usuario', type: 'text', content: `<p>${message}</p>` };
    setMessages((prev) => [...prev, userMsg]);
    setMessage('');
    try {
      const { message: botMsg, ready, payload } = await sendMessage([...messages, userMsg]);
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', content: `<p>${botMsg}</p>` }]);
      if (ready && payload) {
        setPendingIntent(payload);
        try {
          await sendIntent(payload);
          setIntentNotice('✅ Consulta lista y enviada al backend.');
        } catch {
          setIntentNotice('Error al enviar la consulta');
        }
      }
    } catch {
      setMessages((prev) => [...prev, { sender: 'bot', type: 'text', content: '<p>Error obteniendo respuesta</p>' }]);
    }
  };

  return { messages, message, setMessage, send: handleSend, intentNotice, pendingIntent };
}
