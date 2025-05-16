"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/ui/containers/Sidebar";
import ChatWindow from "@/components/ui/containers/ChatWindow";
import ChatInput from "@/components/ui/containers/ChatInput";
import { ChatMessage } from "@/types/generalTypes";
import "./style.css";
import { useUser } from "@/contexts/userContext";
import usePropertiesHook from "@/hooks/usePropertiesHook";
import useFavoriteHook from "@/hooks/useFavoriteById";
import createChatService from "@/services/createChatService";
import addMessageService from "@/services/addMessageService";

interface ChatSession {
  id: string;
  apiChatId?: number;
  title: string;
  date: string;
  messages: ChatMessage[];
}

export default function HomePage() {
  // Llamada al contexto de usuario
  const { user } = useUser();
  const userName = user?.nombre || null; // Puede ser string o null
  const { favorites, favoriteLoading, favoriteError } = useFavoriteHook(user?.id ?? 0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [message, setMessage] = useState("");
  const [showCards, setShowCards] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [savedMessages, setSavedMessages] = useState<{ title: string; link: string }[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { properties, isLoading, error } = usePropertiesHook();

  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    const saved = localStorage.getItem("savedBotMessages");
    if (saved) setSavedMessages(JSON.parse(saved));

    const stored = localStorage.getItem("chatSessions");
    let parsed: ChatSession[] = [];
    if (stored) {
      parsed = JSON.parse(stored);
      setSessions(parsed);
    }

    const sId = searchParams.get("sessionId");
    if (sId && parsed.length > 0) {
      const found = parsed.find((s) => s.id === sId);
      if (found) {
        setCurrentSession(found);
        return;
      }
    }
    if (parsed.length > 0) {
      setCurrentSession(parsed[parsed.length - 1]);
    } else {
      startNewSession();
    }
  }, [initialized, searchParams]);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions, initialized]);

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
  }, [currentSession?.messages]);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMainContent(sidebarOpen);
  };
  const handleSidebarOptionClick = () => {
    setSidebarOpen(false);
    setShowMainContent(true);
  };

  const handleGoToSaved = () => router.push("/savedPage");
  const handleGoHome = () => router.push("/homePage");
  const handleHistoryChats = () => router.push("/chatHistoryPage");
  const handleAnalytics = () => router.push("/reportsPage");
  const suscriptionsView = () => router.push("/suscriptionsPage");

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

  const sendMessage = async (text: string) => {
    if (!text.trim() || !currentSession) return;
    setShowCards(false);

    const userMsg: ChatMessage = {
      sender: "usuario",
      type: "text",
      content: `<p>${text}</p>`,
    };

    setCurrentSession({
      ...currentSession,
      messages: [...currentSession.messages, userMsg],
    });
    setMessage("");


    try {
      if (!currentSession.apiChatId && user?.id) {
        const apiId = await createChatService(user?.id);
        setCurrentSession(prev => prev && ({ ...prev, apiChatId: apiId }));
      }
      if (currentSession.apiChatId) {
        const saved = await addMessageService(
          currentSession.apiChatId!,
          text,
          "usuario"
        );
        setCurrentSession(prev => {
          if (!prev) return prev;
          // elimina el último userMsg y añade el real con id
          const msgs = prev.messages.slice(0, -1);
          return {
            ...prev,
            messages: [
              ...msgs,
              {
                id: saved.id,
                sender: saved.tipo,
                type: "text",
                content: `<p>${saved.contenido}</p>`,
              },
            ],
          };
        });

      }
    } catch (e: any) {
      console.error(e);
      alert("Error al enviar mensaje: " + e.message);
    }
    setTimeout(() => {
      const analyzingMsg: ChatMessage = {
        sender: "bot",
        type: "text",
        content: `<p><strong>Bot:</strong> Estoy analizando tu consulta...</p>`,
      };

      setCurrentSession((prev) => {
        if (!prev) return null;
        return { ...prev, messages: [...prev.messages, analyzingMsg] };
      });

      setTimeout(() => {
        const recommendedMsg: ChatMessage = {
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
          return { ...prev, messages: [...prev.messages, recommendedMsg] };
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
      const exists = prev.some((p) => p.title === item.title);
      const updated = exists ? prev.filter((p) => p.title !== item.title) : [...prev, item];
      localStorage.setItem("savedBotMessages", JSON.stringify(updated));
      return updated;
    });
  };

  const quickOptions = [
    { title: "Ayudame a buscar una casa", detail: "En Asunción para alquiler" },
    { title: "Quiero comprar un departamento", detail: "En zona Villamorra o Carmelitas" },
    { title: "¿Qué propiedades hay disponibles?", detail: "En Lambaré con 3 habitaciones" },
    { title: "Busco una oficina para alquilar", detail: "Con estacionamiento incluido" },
  ];

  // Si no hay userName, no se renderiza el contenido
  if (!userName) return null;

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Sidebar para pantallas grandes */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <Sidebar
          onNewChat={startNewSession}
          onSavedClick={handleGoToSaved}
          onOptionClick={handleSidebarOptionClick}
          userName={userName}
          onHomeClick={handleGoHome}
          handleHistoryChats={handleHistoryChats}
          handleAnalytics={handleAnalytics}
          suscriptionView={suscriptionsView}
        />
      </aside>

      {/* Sidebar para pantallas pequeñas */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <Sidebar
              onNewChat={startNewSession}
              onSavedClick={handleGoToSaved}
              onOptionClick={handleSidebarOptionClick}
              userName={userName}
              onHomeClick={handleGoHome}
              handleHistoryChats={handleHistoryChats}
              handleAnalytics={handleAnalytics}
              suscriptionView={suscriptionsView}
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
                <h1 className="text-2xl font-semibold">👋 ¡Hola {userName}!</h1>
                <h2 className="text-4xl font-bold mt-2">¿Qué tipo de propiedad buscás?</h2>
                <p className="text-gray-500 mt-2">
                  Estamos para ayudarte a encontrar tu nuevo hogar.
                </p>
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

        <ChatWindow
          messages={currentSession?.messages || []}
          savedMessages={savedMessages}
          chatRef={chatRef}
          onSaveBotMessage={handleSaveBotMessage}
        />
      </div>

      <ChatInput message={message} onMessageChange={setMessage} onSend={() => sendMessage(message)} />    </div>
  );
}
