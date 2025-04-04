"use client";

import React from "react";
import { ChatInputProps } from "@/types/generalTypes";


export default function ChatInput({ message, onMessageChange, onSend }: ChatInputProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:ml-64 bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="¿Qué estás buscando?"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
