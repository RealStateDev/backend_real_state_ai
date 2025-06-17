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

        if (msg.type === "recommendation" && msg.items) {
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

        return null;
      })}
    </div>
  );
}
