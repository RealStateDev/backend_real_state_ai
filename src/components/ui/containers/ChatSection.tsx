"use client";

import React from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { ChatSectionProps } from "@/types/generalTypes";

export default function ChatSection({
  userName,
  showCards,
  messages,
  savedMessages,
  chatRef,
  message,
  onMessageChange,
  onSend,
  onQuickOptionSelect,
}: ChatSectionProps) {
  const quickOptions = [
    { title: "Ayudame a buscar una casa", detail: "En Asunción para alquiler" },
    { title: "Quiero comprar un departamento", detail: "En zona Villamorra o Carmelitas" },
    { title: "¿Qué propiedades hay disponibles?", detail: "En Lambaré con 3 habitaciones" },
    { title: "Busco una oficina para alquilar", detail: "Con estacionamiento incluido" },
  ];

  return (
    <>
      {showCards && (
        <div className="shrink-0">
          <main className="flex flex-col items-center text-center px-6 pt-10">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-semibold">👋 ¡Hola {userName}!</h1>
              <h2 className="text-4xl font-bold mt-2">¿Qué tipo de propiedad buscás?</h2>
              <p className="text-gray-500 mt-2">Estamos para ayudarte a encontrar tu nuevo hogar.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
                {quickOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                    onClick={() => onQuickOptionSelect(`${opt.title} ${opt.detail}`)}
                  >
                    <h3 className="font-semibold text-gray-800">{opt.title}</h3>
                    <p className="text-sm text-gray-500">{opt.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      )}

      <ChatWindow
        messages={messages}
        savedMessages={savedMessages}
        chatRef={chatRef}
        onSaveBotMessage={() => {}}
      />

      <ChatInput
        message={message}
        onMessageChange={onMessageChange}
        onSend={onSend}
      />
    </>
  );
}
