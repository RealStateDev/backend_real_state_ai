"use client";

import React, { useEffect, useState, useRef } from "react";
import { FiMenu, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/containers/Sidebar";
import { useUser } from "@/contexts/userContext";
import deleteChat from "@/services/deleteChat";
import getChatByUserId from "@/services/getChatByUserId";

export default function ChatHistoryPage() {
  const { user } = useUser();
  const userName = user?.nombre || null;
  const userId = user?.id;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Al montar: obtener sesiones desde backend
  useEffect(() => {
    const fetchChats = async () => {
      if (!userId) return;
      try {
        const res = await getChatByUserId(userId);
        if (res.code === 1 && res.chatsList) {
          setSessions(res.chatsList);
        }
      } catch (error) {
        console.error("Error cargando historial de chats:", error);
      }
    };
    fetchChats();
  }, [userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [sessions]);

  const startNewSession = () => router.push("/homePage");

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMainContent(sidebarOpen);
  };

  const handleSidebarOptionClick = () => {
    setSidebarOpen(false);
    setShowMainContent(true);
  };

  const handleDelete = async (chatId: number) => {
    try {
      await deleteChat(chatId);
      const updated = sessions.filter(s => s.id !== chatId);
      setSessions(updated);
    } catch (error: any) {
      console.error("Error eliminando chat:", error.message);
    }
  };

  const handleLogout = () => router.push("/loginPage");
  const handleGoToSaved = () => router.push("/savedPage");
  const handleGoHome = () => router.push("/homePage");
  const handleHistoryChats = () => router.push("/chatHistoryPage");
  const handleAnalytics = () => router.push("/reportsPage");
  const suscriptionsView = () => router.push("/suscriptionsPage");

  const resumeSession = (chatId: number) => {
    router.push(`/homePage?sessionId=${chatId}`);
  };

  if (!userName) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* SIDEBAR (desktop) */}
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

      {/* SIDEBAR (mobile) */}
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

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 relative">
        <button onClick={handleMenuToggle} className="md:hidden absolute top-4 left-4 z-50">
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

        {showMainContent && (
          <main ref={scrollRef} className="px-6 py-10 max-w-3xl mx-auto overflow-y-auto" style={{ maxHeight: "80vh" }}>
            <h1 className="text-3xl font-bold mb-8">Historial de chats</h1>
            {sessions.length === 0 ? (
              <p className="text-gray-500">No hay chats guardados.</p>
            ) : (
              <ul className="space-y-4">
                {sessions.map((session) => (
                  <li key={session.id} className="relative bg-white p-4 rounded-lg border shadow-sm">
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      aria-label="Eliminar chat"
                    >
                      <FiTrash2 />
                    </button>

                    <h2 className="font-semibold">
                      Chat #{session.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(session.fecha).toLocaleString()} – {session.mensajes.length} mensajes
                    </p>
                    <button
                      onClick={() => resumeSession(session.id)}
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Reanudar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
