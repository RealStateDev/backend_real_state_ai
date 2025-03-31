"use client";

import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch, CiHome } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function SavedPage() {
  const [savedBotMessages, setSavedBotMessages] = useState<{ title: string; link: string }[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);

  const router = useRouter();

  // Al montar, obtenemos las propiedades guardadas y el nombre de usuario
  useEffect(() => {
    const saved = localStorage.getItem("savedBotMessages");
    if (saved) {
      setSavedBotMessages(JSON.parse(saved));
    }

    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
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

  const handleLogout = () => {
    router.push("/loginPage");
  };

  // Ir a HomePage
  const handleGoHome = () => {
    router.push("/homePage"); // Ajusta la ruta a la que sea tu home
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* SIDEBAR (desktop) */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <SidebarContent
          onOptionClick={handleSidebarOptionClick}
          onLogout={handleLogout}
          userName={userName}
          onHomeClick={handleGoHome}
        />
      </aside>

      {/* SIDEBAR (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <SidebarContent
              onOptionClick={handleSidebarOptionClick}
              onLogout={handleLogout}
              userName={userName}
              onHomeClick={handleGoHome}
            />
          </div>
          <div className="flex-1 bg-white bg-opacity-25" onClick={handleMenuToggle} />
        </div>
      )}

      {/* MAIN CONTENT */}
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

// SIDEBAR
function SidebarContent({
  onOptionClick,
  onLogout,
  userName,
  onHomeClick,
}: {
  onOptionClick: () => void;
  onLogout: () => void;
  userName: string;
  onHomeClick: () => void; 
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-8 mt-8">RealState AI</h2>
        <nav className="space-y-4">
          <SidebarButton icon={<CiCirclePlus />} label="Nueva búsqueda" onClick={onOptionClick} />
          <SidebarButton icon={<CiFolderOn />} label="Propiedades guardadas" onClick={onOptionClick} />
          <SidebarButton icon={<CiSearch />} label="Buscar" onClick={onOptionClick} />
          {/* Botón de Inicio */}
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

// BOTÓN SIDEBAR
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
