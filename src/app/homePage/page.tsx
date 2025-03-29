"use client";
import React, { useEffect, useRef, useState } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { BsPersonFill } from "react-icons/bs";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; content: string }[]>([]);
  const [showCards, setShowCards] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
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

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowCards(false);

    const userMsg = { sender: "user" as const, content: `<p>${text}</p>` };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");

    setTimeout(() => {
      const botMsg = {
        sender: "bot" as const,
        content: `<p><strong>Bot:</strong> Estoy analizando tu consulta sobre <em>${text}</em>...</p>`
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
  };

  const quickOptions = [
    { title: "Ayudame a buscar una casa", detail: "En Asunción para alquiler" },
    { title: "Quiero comprar un departamento", detail: "En zona Villamorra o Carmelitas" },
    { title: "¿Qué propiedades hay disponibles?", detail: "En Lambaré con 3 habitaciones" },
    { title: "Busco una oficina para alquilar", detail: "Con estacionamiento incluido" },
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <SidebarContent onOptionClick={() => {}} onLogout={handleLogout} userName={userName} />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <SidebarContent onOptionClick={handleSidebarOptionClick} onLogout={handleLogout} userName={userName} />
          </div>
          <div className="flex-1 bg-white bg-opacity-25" onClick={handleMenuToggle} />
        </div>
      )}

      {/* Main + Chat */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header y tarjetas */}
        {showMainContent && (
          <div className="shrink-0 px-6 pt-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-semibold">👋 {`¡Hola ${userName || "!"}!`}</h1>
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
          </div>
        )}

        {/* Chatbox scrollable */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4 max-w-2xl mx-auto w-full">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] text-sm leading-relaxed ${
                  msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                } animate-fade-in`}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
              <div className="sr-only" aria-hidden="true">{msg.content}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="shrink-0 bg-white border-t border-gray-200 px-4 py-3">
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
    </div>
  );
}

function SidebarContent({
  onOptionClick,
  onLogout,
  userName,
}: {
  onOptionClick: () => void;
  onLogout: () => void;
  userName: string;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-8 mt-8">RealState AI</h2>
        <nav className="space-y-4">
          <SidebarButton icon={<CiCirclePlus />} label="Nueva búsqueda" onClick={onOptionClick} />
          <SidebarButton icon={<CiFolderOn />} label="Propiedades guardadas" onClick={onOptionClick} />
          <SidebarButton icon={<CiSearch />} label="Buscar" onClick={onOptionClick} />
        </nav>
      </div>
      <div className="space-y-6">
        <SidebarButton icon={<FiLogOut />} label="Salir" onClick={onLogout} />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
            <BsPersonFill className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{userName || "Usuario"}</p>
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
