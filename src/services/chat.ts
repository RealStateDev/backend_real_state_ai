import { ChatMessage } from '@/types/generalTypes';
import { IntentPayload } from '@/types/intent';

export interface ChatAPIResponse {
  message: string;
  ready: boolean;
  payload: IntentPayload | null;
}

export async function sendMessage(messages: ChatMessage[]): Promise<ChatAPIResponse> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    throw new Error('Error enviando mensaje');
  }

  return res.json();
}
