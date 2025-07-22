"use client";

import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { ChatWindowProps } from "@/types/generalTypes";

export default function ChatWindow({
  messages,
  savedMessages,
  chatRef,
  onSaveBotMessage,
}: ChatWindowProps) {
  const formatHora = (fecha?: string) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto px-6 pt-4 pb-32 max-w-2xl mx-auto w-full"
    >
      {messages.map((msg, index) => {
        if (msg.type === "text" || !msg.type) {
          return (
            <div
              key={index}
              className={`flex ${
                msg.sender === "usuario" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div className="max-w-md">
                <div
                  className={`px-4 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "usuario"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
                {msg.fecha && (
                  <div
                    className={`text-xs mt-1 ${
                      msg.sender === "usuario" ? "text-right" : "text-left"
                    } text-gray-400`}
                  >
                    {formatHora(msg.fecha)}
                  </div>
                )}
              </div>
            </div>
          );
        }

if (msg.type === "recommendation") {
  // Caso A: propiedades (cards)
  if (msg.properties && msg.properties.length) {
    return (
      <div key={index} className="flex justify-start mb-4">
        <div className="bg-gray-200/60 px-4 py-3 rounded-lg max-w-xl w-full">
          {msg.content && (
            <p className="font-semibold mb-2">{msg.content}</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {msg.properties.map((p, i) => {
              const price =
                typeof p.precio === "number"
                  ? p.precio.toLocaleString("es-PY")
                  : p.precio;

              return (
                <div
                  key={p.id ?? i}
                  className="border rounded-md bg-white p-3 text-xs shadow-sm"
                >
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.titulo}
                      className="w-full h-24 object-cover rounded mb-1"
                    />
                  )}
                  <div className="font-medium line-clamp-2">{p.titulo}</div>
                  <div className="text-blue-700 font-semibold">
                    {price} Gs
                    {p.trans_type === "alquiler" && (
                      <span className="text-gray-500 font-normal">
                        {" "}/ mes
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 text-gray-500 mt-1">
                    {p.ciudad && <span>{p.ciudad}</span>}
                    {p.zona && <span>• {p.zona}</span>}
                    {p.dormitorios != null && <span>• {p.dormitorios}D</span>}
                    {p.banos != null && <span>• {p.banos}B</span>}
                  </div>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline mt-1 inline-block"
                    >
                      Ver detalle
                    </a>
                  )}
                </div>
              );
            })}
          </div>
          {msg.fecha && (
            <div className="text-xs mt-2 text-gray-400">
              {formatHora(msg.fecha)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Caso B: lista de items (lo que ya tenías)
  if (msg.items && msg.items.length) {
    return (
      <div key={index} className="flex justify-start mb-2">
        <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm leading-relaxed max-w-md">
          <p>
            <strong>Bot: </strong>
            {msg.content}
          </p>
            <ul className="mt-2 ml-4 list-disc">
            {msg.items.map((item, i) => {
              const isSaved = savedMessages.some(
                (p) => p.title === item.title
              );
              return (
                <li
                  key={i}
                  className="mt-1 flex items-center justify-between gap-2"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {item.title}
                  </a>
                  {isSaved ? (
                    <BsHeartFill
                      className="text-pink-500 cursor-pointer"
                      onClick={() => onSaveBotMessage(item)}
                    />
                  ) : (
                    <BsHeart
                      className="text-gray-400 hover:text-pink-500 cursor-pointer"
                      onClick={() => onSaveBotMessage(item)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          {msg.fecha && (
            <div className="text-xs mt-1 text-left text-gray-400">
              {formatHora(msg.fecha)}
            </div>
          )}
        </div>
      </div>
    );
  }
}


        return null;
      })}
    </div>
  );
}
