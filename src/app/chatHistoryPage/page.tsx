"use client";

import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch, CiHome, CiChat1 } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { BsPersonFill } from "react-icons/bs";

// Repite la misma interfaz
interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: any[]; // Ajusta si tienes un tipo + estricto
}

export default function ChatHistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);

  const [userName, setUserName] = useState<string>("");
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  const router = useRouter();

  // Al montar, leemos userName y chatSessions
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    const stored = localStorage.getItem("chatSessions");
    if (stored) {
      const parsed: ChatSession[] = JSON.parse(stored);
      setSessions(parsed);
    }
  }, []);

  // SIDEBAR mobile
  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMainContent(sidebarOpen);
  };

  const handleSidebarOptionClick = () => {
    setSidebarOpen(false);
    setShowMainContent(true);
  };

  // Navegaciones
  const handleLogout = () => {
    router.push("/loginPage");
  };
  const handleGoToSaved = () => {
    router.push("/savedPage");
  };
  const handleGoHome = () => {
    router.push("/homePage");
  };
  const handleNewChat = () => {
    // Simplemente ve a HomePage y crea chat nuevo
    router.push("/homePage"); // Podrías añadir "nuevoChat=1" si quieres
  };
  const handleHistoryChats = () => {
    // Ya estás en Historial, si quisieras quedarte
  };

  // Reanudar la sesión => push a home con ?sessionId
  const resumeSession = (id: string) => {
    router.push(`/homePage?sessionId=${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* SIDEBAR (desktop) */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <SidebarContent
          onNewChat={handleNewChat}
          onSavedClick={handleGoToSaved}
          onOptionClick={handleSidebarOptionClick}
          onLogout={handleLogout}
          userName={userName}
          onHomeClick={handleGoHome}
          handleHistoryChats={handleHistoryChats}
        />
      </aside>

      {/* SIDEBAR (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <SidebarContent
              onNewChat={handleNewChat}
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
          <main className="px-6 py-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Historial de Chats</h1>
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

// ============== SIDEBAR ==============
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
