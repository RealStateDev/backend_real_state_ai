"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/ui/containers/Sidebar";
import ChatSection from "@/components/ui/containers/ChatSection";
import { ChatMessage } from "@/types/generalTypes";
import "./style.css";
import { useUser } from "@/contexts/userContext";
import createChatService from "@/services/createChatService";
import getChatByUserId from "@/services/getChatByUserId";
import BackdropCus from "@/components/ui/commons/BackdropCus";
import sendChatAndGetAnswerService from "@/services/sendChatAndGetAnswerService";

interface ChatSession {
  id: string;
  apiChatId: number;
  title: string;
  date: string;
  messages: ChatMessage[];
}

export default function HomePage() {
  const { user } = useUser();
  const userName = user?.nombre || null;
  const userId = user?.id;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showCards, setShowCards] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [savedMessages, setSavedMessages] = useState<
    { title: string; link: string }[]
  >([]);

  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------- Cargar historial al montar ---------- */
  useEffect(() => {
    const fetchChats = async () => {
      if (!userId) return;
      try {
        const { chatsList } = await getChatByUserId(userId);
        setSessions(chatsList || []);

        const sId = searchParams.get("sessionId");
        const found = chatsList?.find((c: any) => c.id === Number(sId));
        if (found) {
          const session = convertChat(found);
          setCurrentSession(session);
          if (session.messages.length > 0) setShowCards(false);
          return;
        }

        if (chatsList.length > 0) {
          const last = convertChat(chatsList[chatsList.length - 1]);
          setCurrentSession(last);
          if (last.messages.length > 0) setShowCards(false);
        }
      } catch (err) {
        console.error("Error al cargar chats:", err);
      }
    };
    fetchChats();
  }, [userId]);

  /* ---------- Scroll auto ---------- */
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [currentSession?.messages]);

  /* ---------- Helpers ---------- */
  const convertChat = (chat: any): ChatSession => ({
    id: String(chat.id),
    apiChatId: chat.id,
    title: "Chat " + new Date(chat.fecha).toLocaleString(),
    date: chat.fecha,
    messages: chat.mensajes.map((m: any) => ({
      id: m.id,
      sender: m.tipo,
      type: "text",
      content: `<p>${m.contenido}</p>`,
      fecha: m.fecha,
    })),
  });

  const startNewSession = async () => {
    if (!userId) return;
    try {
      const chat = await createChatService(userId);
      const session = convertChat({ ...chat, mensajes: [] });
      setCurrentSession(session);
      setSessions((prev) => [...prev, session]);
      setShowCards(true);
    } catch (err) {
      console.error("Error creando chat:", err);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Si no existe una sesión activa, creamos una nueva
    let session = currentSession;
    if (!session) {
      if (!userId) return;
      try {
        const chat = await createChatService(userId);
        session = convertChat({ ...chat, mensajes: [] });
        setCurrentSession(session);
        setSessions((prev) => [...prev, session!]);
      } catch (err) {
        console.error("Error creando chat:", err);
        return;
      }
    }

    setShowCards(false);

    // Mensaje optimista del usuario
    const tempUserMsg: ChatMessage = {
      sender: "usuario",
      type: "text",
      content: `<p>${text}</p>`,
    };

    // Mensaje "pensando" del bot
    const tempThinking: ChatMessage = {
      sender: "bot",
      type: "text",
      content: `<p><em>Pensando...</em></p>`,
    };

    setCurrentSession((p) =>
      p
        ? {
            ...p,
            messages: [...p.messages, tempUserMsg, tempThinking],
          }
        : p
    );
    setMessage("");

    try {
      const data = await sendChatAndGetAnswerService(session.apiChatId, text);

      // Reemplazar los dos últimos mensajes temporales por los reales
      setCurrentSession((p) =>
        p
          ? {
              ...p,
              messages: [
                ...p.messages.slice(0, -2),
                {
                  id: data.userMessage.id,
                  sender: "usuario",
                  type: "text",
                  content: `<p>${data.userMessage.contenido}</p>`,
                  fecha: data.userMessage.fecha,
                },
                {
                  id: data.botMessage.id,
                  sender: "bot",
                  type: "text",
                  content: `<p>${data.botMessage.contenido}</p>`,
                  fecha: data.botMessage.fecha,
                },
              ],
            }
          : p
      );

      // >>> NUEVO: insertar recomendaciones si viene propertiesPayload
      if (
        data.propertiesPayload &&
        Array.isArray(data.propertiesPayload) &&
        data.propertiesPayload.length > 0
      ) {
        const props = data.propertiesPayload;
        setCurrentSession((p) =>
          p
            ? {
                ...p,
                messages: [
                  ...p.messages,
                  {
                    sender: "bot",
                    type: "recommendation",
                    content: "Propiedades recomendadas:",
                    properties: props.map((r: any) => ({
                      id: r.id,
                      titulo: r.titulo,
                      precio: r.precio,
                      ciudad: r.ciudad,
                      zona: r.zona,
                      tipo_propiedad: r.tipo_propiedad,
                      trans_type: r.trans_type,
                      dormitorios: r.dormitorios,
                      banos: r.banos,
                      garajes: r.garajes,
                      url: r.url,
                      image_url: r.image_url,
                    })),
                  },
                ],
              }
            : p
        );
      }
      // <<< FIN NUEVO
    } catch (err) {
      console.error("Error enviando mensaje:", err);
      // Reemplaza el “Pensando...” por un error
      setCurrentSession((p) =>
        p
          ? {
              ...p,
              messages: [
                ...p.messages.slice(0, -1),
                {
                  sender: "bot",
                  type: "text",
                  content: `<p><strong>Error:</strong> No pude procesar tu mensaje.</p>`,
                },
              ],
            }
          : p
      );
    }
  };

  /* ---------- Render ---------- */
  if (!userName)
    return (
      <div className="h-screen w-screen">
        <BackdropCus color="#155dfc" open={true} />
      </div>
    );

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* -------- Sidebar (desktop) -------- */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <Sidebar
          onNewChat={startNewSession}
          onSavedClick={() => router.push("/savedPage")}
          onOptionClick={() => setSidebarOpen(false)}
          userName={userName}
          onHomeClick={() => router.push("/homePage")}
          handleHistoryChats={() => router.push("/chatHistoryPage")}
          handleAnalytics={() => router.push("/reportsPage")}
          suscriptionView={() => router.push("/suscriptionsPage")}
        />
      </aside>

      {/* -------- Sidebar (mobile overlay) -------- */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <Sidebar
              onNewChat={startNewSession}
              onSavedClick={() => router.push("/savedPage")}
              onOptionClick={() => setSidebarOpen(false)}
              userName={userName}
              onHomeClick={() => router.push("/homePage")}
              handleHistoryChats={() => router.push("/chatHistoryPage")}
              handleAnalytics={() => router.push("/reportsPage")}
              suscriptionView={() => router.push("/suscriptionsPage")}
            />
          </div>
          <div
            className="flex-1 bg-white/25"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* -------- Área de chat -------- */}
      <div className="flex-1 flex flex-col relative">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden absolute top-4 left-4 z-50"
        >
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

        <ChatSection
          userName={userName}
          showCards={showCards}
          messages={currentSession?.messages || []}
          savedMessages={savedMessages}
          chatRef={chatRef}
          message={message}
          onMessageChange={setMessage}
          onSend={() => sendMessage(message)}
          onQuickOptionSelect={(txt) => sendMessage(txt)}
        />
      </div>
    </div>
  );
}
