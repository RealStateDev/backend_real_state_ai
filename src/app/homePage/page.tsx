"use client";

import React, { useEffect, useRef, useState } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch, CiHome } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { BsPersonFill, BsHeart, BsHeartFill } from "react-icons/bs";

interface BaseMessage {
  sender: "user" | "bot";
}

interface TextMessage extends BaseMessage {
  type?: "text";
  content: string;
}

interface RecommendationMessage extends BaseMessage {
  type?: "recommendation";
  content: string;
  items: { title: string; link: string }[];
}

type ChatMessage = TextMessage | RecommendationMessage;

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showCards, setShowCards] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [savedMessages, setSavedMessages] = useState<{ title: string; link: string }[]>([]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("savedBotMessages");
    if (saved) {
      setSavedMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMainContent(sidebarOpen);
  };

  const handleSidebarOptionClick = () => {
    setSidebarOpen(false);
    setShowMainContent(true);
  };

  const handleLogout = () => {
    router.push("/loginPage");
  };

  const handleGoToSaved = () => {
    router.push("/savedPage");
  };

  const handleGoHome = () => {
    router.push("/homePage");
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowCards(false);

    const userMsg: TextMessage = { sender: "user", type: "text", content: `<p>${text}</p>` };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    setTimeout(() => {
      const analyzingMsg: TextMessage = {
        sender: "bot",
        type: "text",
        content: `<p><strong>Bot:</strong> Estoy analizando tu consulta sobre <em>${text}</em>...</p>`,
      };
      setMessages((prev) => [...prev, analyzingMsg]);

      setTimeout(() => {
        const recommendedMsg: RecommendationMessage = {
          sender: "bot",
          type: "recommendation",
          content: "Las propiedades que le recomiendo son:",
          items: [
            { title: "Propiedad 1", link: "https://example.com/propiedad-1" },
            { title: "Propiedad 2", link: "https://example.com/propiedad-2" },
            { title: "Propiedad 3", link: "https://example.com/propiedad-3" },
          ],
        };
        setMessages((prev) => [...prev, recommendedMsg]);
      }, 2000);
    }, 1000);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
  };

  const handleSaveBotMessage = (item: { title: string; link: string }) => {
    setSavedMessages((prev) => {
      const alreadyExists = prev.some((p) => p.title === item.title);
      let newList;
      if (alreadyExists) {
        newList = prev.filter((p) => p.title !== item.title);
      } else {
        newList = [...prev, item];
      }
      localStorage.setItem("savedBotMessages", JSON.stringify(newList));
      return newList;
    });
  };

  const quickOptions = [
    { title: "Ayudame a buscar una casa", detail: "En Asunción para alquiler" },
    { title: "Quiero comprar un departamento", detail: "En zona Villamorra o Carmelitas" },
    { title: "¿Qué propiedades hay disponibles?", detail: "En Lambaré con 3 habitaciones" },
    { title: "Busco una oficina para alquilar", detail: "Con estacionamiento incluido" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <SidebarContent
          onSavedClick={handleGoToSaved}
          onOptionClick={() => {}}
          onLogout={handleLogout}
          userName={userName}
          onHomeClick={handleGoHome}
        />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <SidebarContent
              onSavedClick={handleGoToSaved}
              onOptionClick={handleSidebarOptionClick}
              onLogout={handleLogout}
              userName={userName}
              onHomeClick={handleGoHome}
            />
          </div>
          <div className="flex-1 bg-white bg-opacity-25" onClick={handleMenuToggle} />
        </div>
      )}

      <div className="flex-1 relative">
        <button
          onClick={handleMenuToggle}
          className="md:hidden absolute top-4 left-4 z-50"
        >
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

        {showMainContent && (
          <main className="flex flex-col items-center justify-center text-center px-6 pt-10 pb-16">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-semibold">👋 ¡Hola {userName || ""}!</h1>
              <h2 className="text-4xl font-bold mt-2">¿Qué tipo de propiedad buscás?</h2>
              <p className="text-gray-500 mt-2">Estamos para ayudarte a encontrar tu nuevo hogar.</p>
              {showCards && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
                  {quickOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                      onClick={() => sendMessage(`${opt.title} ${opt.detail}`)}
                    >
                      <h3 className="font-semibold text-gray-800">{opt.title}</h3>
                      <p className="text-sm text-gray-500">{opt.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        )}

        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4 max-w-2xl mx-auto w-full">
          {messages.map((msg, index) => {
            if (!msg.type || msg.type === "text") {
              return (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className="px-4 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap bg-gray-200 text-gray-800 max-w-md"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                </div>
              );
            }

            if (msg.type === "recommendation") {
              return (
                <div key={index} className="flex justify-start mb-2">
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm leading-relaxed max-w-md">
                    <p>
                      <strong>Bot: </strong>
                      {msg.content}
                    </p>
                    <ul className="mt-2 ml-4 list-disc">
                      {msg.items.map((item, i) => {
                        const isSaved = savedMessages.some((p) => p.title === item.title);
                        return (
                          <li key={i} className="mt-1 flex items-center justify-between gap-2">
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
                                className="inline-block ml-2 cursor-pointer transition text-pink-500"
                                onClick={() => handleSaveBotMessage(item)}
                              />
                            ) : (
                              <BsHeart
                                className="inline-block ml-2 cursor-pointer transition text-gray-400 hover:text-pink-500"
                                onClick={() => handleSaveBotMessage(item)}
                              />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:ml-64 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="¿Qué estás buscando?"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

// SIDEBAR
function SidebarContent({
  onOptionClick,
  onLogout,
  userName,
  onSavedClick,
  onHomeClick,
}: {
  onOptionClick: () => void;
  onLogout: () => void;
  userName: string;
  onSavedClick: () => void;
  onHomeClick: () => void;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-8 mt-8">RealState AI</h2>
        <nav className="space-y-4">
          <SidebarButton
            icon={<CiCirclePlus />}
            label="Nueva búsqueda"
            onClick={onOptionClick}
          />
          <SidebarButton
            icon={<CiFolderOn />}
            label="Propiedades guardadas"
            onClick={onSavedClick}
          />
          <SidebarButton
            icon={<CiSearch />}
            label="Buscar"
            onClick={onOptionClick}
          />
          <SidebarButton
            icon={<CiHome />}
            label="Inicio"
            onClick={onHomeClick}
          />
        </nav>
      </div>
      <div className="space-y-6 mt-8">
        <SidebarButton icon={<FiLogOut />} label="Salir" onClick={onLogout} />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
            <BsPersonFill className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              {userName || "Usuario"}
            </p>
            <p className="text-xs text-gray-500">Mi cuenta</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition whitespace-nowrap"
    >
      <div className="text-blue-400 w-5 h-5">{icon}</div>
      <span>{label}</span>
    </button>
  );
}
