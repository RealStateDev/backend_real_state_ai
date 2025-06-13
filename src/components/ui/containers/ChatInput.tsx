"use client";

import React, { useRef } from "react";
import { ChatInputProps } from "@/types/generalTypes";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatInput({
  message,
  onMessageChange,
  onSend,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="absolute bottom-0 inset-x-0 px-6 py-4 bg-white border-t border-gray-200 z-10">
      <div className="max-w-2xl mx-auto flex items-center gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 resize-none px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="Escribí tu mensaje..."
        />
        <button
          onClick={onSend}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
        >
          <FaPaperPlane className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
