"use client";

import React, { useEffect, useState, useRef  } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch, CiHome, CiChat1 } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { BsPersonFill } from "react-icons/bs";
import Sidebar from "@/components/ui/containers/Sidebar";
import { useUser } from "@/contexts/userContext";

// Repite la misma interfaz
interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: any[];
}

export default function ChatHistoryPage() {
  const { user } = useUser();
  const userName = user?.nombre || null; // Puede ser string o null
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Al montar, leemos userName y chatSessions
  useEffect(() => {
    /*const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);*/

    const stored = localStorage.getItem("chatSessions");
    if (stored) {
      const parsed: ChatSession[] = JSON.parse(stored);
      setSessions(parsed);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [sessions]);
  const startNewSession = () => {
    const newSession: ChatSession = {
      id: String(Date.now()),
      title: "Chat " + new Date().toLocaleString(),
      date: new Date().toISOString(),
      messages: [],
    };
    setCurrentSession(newSession);
    setShowCards(true);
    router.push("/homePage");
  };
  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMainContent(sidebarOpen);
  };
  const handleSidebarOptionClick = () => {
    setSidebarOpen(false);
    setShowMainContent
  };
  const handleLogout = () => router.push("/loginPage");
  const handleGoToSaved = () => router.push("/savedPage");
  const handleGoHome = () => router.push("/homePage");
  const handleHistoryChats = () => router.push("/chatHistoryPage");
  const suscriptionsView = () => router.push("/suscriptionsPage");

  // Reanudar la sesión => push a home con ?sessionId
  const resumeSession = (id: string) => {
    router.push(`/homePage?sessionId=${id}`);
  };

  // Si no hay userName, no se renderiza el contenido
  if (!userName) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* SIDEBAR (desktop) */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <Sidebar
          onNewChat={startNewSession}
          onSavedClick={handleGoToSaved}
          onOptionClick={handleSidebarOptionClick}
          onLogout={handleLogout}
          userName={userName}
          onHomeClick={handleGoHome}
          handleHistoryChats={handleHistoryChats}
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
              onLogout={handleLogout}
              userName={userName}
              onHomeClick={handleGoHome}
              handleHistoryChats={handleHistoryChats}
              suscriptionView={suscriptionsView}
            />
          </div>
          <div className="flex-1 bg-white bg-opacity-25" onClick={handleMenuToggle} />
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 relative">
        {/* Botón hamburguesa en mobile */}
        <button
          onClick={handleMenuToggle}
          className="md:hidden absolute top-4 left-4 z-50"
        >
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

        {showMainContent && (
          
          <main ref={scrollRef} className="px-6 py-10 max-w-3xl mx-auto overflow-y-auto" style={{ maxHeight: "80vh" }}>            <h1 className="text-3xl font-bold mb-6">Historial de Chats</h1>
            {sessions.length === 0 ? (
              <p className="text-gray-500">No hay chats guardados.</p>
            ) : (
              <ul className="space-y-4">
                {sessions.map((session) => (
                  <li key={session.id} className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="font-semibold">
                      {session.title || "Chat sin título"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(session.date).toLocaleString()} –{" "}
                      {session.messages.length} mensajes
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
