'use client';
import { useRef } from 'react';
import ChatWindow from '@/components/ui/containers/ChatWindow';
import ChatInput from '@/components/ui/containers/ChatInput';
import useChat from '@/hooks/useChat';

export default function ChatPage() {
  const { messages, message, setMessage, send, intentNotice } = useChat();
  const chatRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen flex flex-col relative">
      {intentNotice && (
        <div className="bg-green-100 text-green-700 text-sm p-2 text-center">
          {intentNotice}
        </div>
      )}
      <ChatWindow
        messages={messages}
        savedMessages={[]}
        chatRef={chatRef}
        onSaveBotMessage={() => {}}
      />
      <ChatInput message={message} onMessageChange={setMessage} onSend={send} />
    </div>
  );
}
