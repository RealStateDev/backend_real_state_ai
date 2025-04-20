"use client";

import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch, CiHome, CiChat1 } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/containers/Sidebar";
import { useUser } from "@/contexts/userContext";

// Repite la misma interfaz
interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: any[];
}

export default function SavedPage() {
  const { user } = useUser();
  const userName = user?.nombre || null; // Puede ser string o null
  const [savedBotMessages, setSavedBotMessages] = useState<{ title: string; link: string }[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [showCards, setShowCards] = useState(true);



  const router = useRouter();


  const startNewSession = () => {
    const newSession: ChatSession = {
      id: String(Date.now()),
      title: "Chat " + new Date().toLocaleString(),
      date: new Date().toISOString(),
      messages: [],
    };
    setCurrentSession(newSession);
    setShowCards(true);
    router.push("/homePage")// luego de 
  };

  // Al montar, obtenemos las propiedades guardadas y el nombre de usuario
  useEffect(() => {
    const saved = localStorage.getItem("savedBotMessages");
    if (saved) {
      setSavedBotMessages(JSON.parse(saved));
    }

    /*const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }*/
  }, []);

  // Toggle para el sidebar en mobile
  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMainContent(sidebarOpen);
  };

  // Cerrar el sidebar en mobile al pulsar alguna opción
  const handleSidebarOptionClick = () => {
    setSidebarOpen(false);
    setShowMainContent(true);
  };

  // Navegación
  const handleLogout = () => router.push("/loginPage");
  const handleGoToSaved = () => router.push("/savedPage");
  const handleGoHome = () => router.push("/homePage");
  const handleHistoryChats = () => router.push("/chatHistoryPage");
  const suscriptionsView = () => router.push("/suscriptionsPage");


  if(!userName) {
    return  null;
  }


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <Sidebar
          onNewChat={startNewSession}
          onSavedClick={handleGoToSaved}
          onOptionClick={handleSidebarOptionClick}
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
              userName={userName}
              onHomeClick={handleGoHome}
              handleHistoryChats={handleHistoryChats}
              suscriptionView={suscriptionsView}
            />
          </div>
          {/* Clic fuera para cerrar */}
          <div
            className="flex-1 bg-white bg-opacity-25"
            onClick={handleMenuToggle}
          />
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
          <main className="flex flex-col px-6 py-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Propiedades guardadas</h1>
            {savedBotMessages.length === 0 ? (
              <p className="text-gray-500">No tienes propiedades guardadas aún.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedBotMessages.map((item, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      Ver propiedad
                    </a>
                  </div>
                ))}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}

