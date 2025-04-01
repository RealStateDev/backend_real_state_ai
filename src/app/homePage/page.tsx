"use client";

import React, { useEffect, useRef, useState } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch, CiHome } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { BsPersonFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { CiChat1 } from "react-icons/ci";
import "./style.css"

interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

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
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [showCards, setShowCards] = useState(true);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);

  const [savedMessages, setSavedMessages] = useState<{ title: string; link: string }[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    const stored = localStorage.getItem("chatSessions");
    if (stored) {
      const parsed: ChatSession[] = JSON.parse(stored);
      setSessions(parsed);
    }

    const saved = localStorage.getItem("savedBotMessages");
    if (saved) setSavedMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const sId = searchParams.get("sessionId");
    if (sId) {
      const found = sessions.find((s) => s.id === sId);
      if (found) {
        setCurrentSession(found);
        return;
      }
    }
   
    if (!currentSession) {
      if (sessions.length > 0) {
        setCurrentSession(sessions[sessions.length - 1]);
      } else {
        startNewSession();
      }
    }
  }, [sessions, currentSession, searchParams]);


  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (!currentSession) return;
    setSessions((prev) => {
      const idx = prev.findIndex((s) => s.id === currentSession.id);
      const updated = [...prev];
      if (idx >= 0) updated[idx] = currentSession;
      else updated.push(currentSession);
      return updated;
    });
  }, [currentSession]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [currentSession]);


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
  const handleHistoryChats = () => {
    router.push("/chatHistoryPage");
  };

  const startNewSession = () => {
    const newSession: ChatSession = {
      id: String(Date.now()),
      title: "Chat " + new Date().toLocaleString(),
      date: new Date().toISOString(),
      messages: [],
    };
    setCurrentSession(newSession);
    setShowCards(true);
  };


  const sendMessage = (text: string) => {
    if (!text.trim() || !currentSession) return;
    setShowCards(false);

    const userMsg: TextMessage = {
      sender: "user",
      type: "text",
      content: `<p>${text}</p>`,
    };

    setCurrentSession({
      ...currentSession,
      messages: [...currentSession.messages, userMsg],
    });
    setMessage("");

  
    setTimeout(() => {
      const analyzingMsg: TextMessage = {
        sender: "bot",
        type: "text",
        content: `<p><strong>Bot:</strong> Estoy analizando tu consulta...</p>`,
      };
      setCurrentSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, analyzingMsg],
        };
      });

      setTimeout(() => {
        const recommendedMsg: RecommendationMessage = {
          sender: "bot",
          type: "recommendation",
          content: "Propiedades recomendadas...",
          items: [
            { title: "Propiedad 1", link: "https://example.com/prop1" },
            { title: "Propiedad 2", link: "https://example.com/prop2" },
            { title: "Propiedad 3", link: "https://example.com/prop3" },
          ],
        };
        setCurrentSession((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            messages: [...prev.messages, recommendedMsg],
          };
        });
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
    <div className="h-screen w-screen overflow-hidden flex">
     
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <SidebarContent
          onNewChat={startNewSession}
          onSavedClick={handleGoToSaved}
          onOptionClick={handleSidebarOptionClick}
          onLogout={handleLogout}
          userName={userName}
          onHomeClick={handleGoHome}
          handleHistoryChats={handleHistoryChats}
        />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <SidebarContent
              onNewChat={startNewSession}
              onSavedClick={handleGoToSaved}
              onOptionClick={handleSidebarOptionClick}
              onLogout={handleLogout}
              userName={userName}
              onHomeClick={handleGoHome}
              handleHistoryChats={handleHistoryChats}
            />
          </div>
          <div className="flex-1 bg-white bg-opacity-25" onClick={handleMenuToggle} />
        </div>
      )}

     
      <div className="flex-1 flex flex-col relative">
       
        <button onClick={handleMenuToggle} className="md:hidden absolute top-4 left-4 z-50">
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

       
        {showMainContent && currentSession && (
          <div className="shrink-0">
            <main className="flex flex-col items-center text-center px-6 pt-10">
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
          </div>
        )}

     
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-6 pt-4 pb-32 max-w-2xl mx-auto w-full"
        >
          {currentSession?.messages.map((msg, index) => {
            if (msg.type === "text") {
              return (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
                >
                          <div
          className={`px-4 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap max-w-md
            ${
              msg.sender === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }
          `}
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

function SidebarContent({
  onNewChat,
  onSavedClick,
  onOptionClick,
  handleHistoryChats,
  onLogout,
  userName,
  onHomeClick,
}: {
  onNewChat: () => void;
  onSavedClick: () => void;
  onOptionClick: () => void;
  handleHistoryChats: () => void;
  onLogout: () => void;
  userName: string;
  onHomeClick: () => void;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-8 mt-8">RealState AI</h2>
        <nav className="space-y-4">
          <SidebarButton icon={<CiCirclePlus />} label="Nuevo chat" onClick={onNewChat} />
          <SidebarButton icon={<CiFolderOn />} label="Propiedades guardadas" onClick={onSavedClick} />
          <SidebarButton icon={<CiSearch />} label="Buscar" onClick={onOptionClick} />
          <SidebarButton icon={<CiChat1 />} label="Historial de Chats" onClick={handleHistoryChats} />
          <SidebarButton icon={<CiHome />} label="Inicio" onClick={onHomeClick} />
        </nav>
      </div>
      <div className="space-y-6 mt-8">
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
