"use client";
import React, { useState } from "react";
import { CiCirclePlus, CiFolderOn, CiSearch } from "react-icons/ci";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation"; // 👈

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const router = useRouter(); // 👈

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMainContent(sidebarOpen); // toggle view
  };

  const handleSidebarOptionClick = () => {
    setSidebarOpen(false);
    setShowMainContent(true);
  };

  const handleLogout = () => {
    router.push("/loginPage");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <SidebarContent onOptionClick={() => {}} onLogout={handleLogout} />
      </aside>

      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white p-6 border-r border-gray-200">
            <SidebarContent onOptionClick={handleSidebarOptionClick} onLogout={handleLogout} />
          </div>
          <div className="flex-1 bg-withe bg-opacity-25" onClick={handleMenuToggle} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 relative">
        <button
          onClick={handleMenuToggle}
          className="md:hidden absolute top-4 left-4 z-50"
        >
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

        {showMainContent && (
          <main className="flex flex-col items-center justify-center text-center px-6 py-16">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-semibold">👋 ¡Hola!</h1>
              <h2 className="text-4xl font-bold mt-2">¿Qué tipo de propiedad buscás?</h2>
              <p className="text-gray-500 mt-2">Estamos para ayudarte a encontrar tu nuevo hogar.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
                {[
                  "Ayudame a buscar una casa",
                  "Quiero comprar un departamento",
                  "¿Qué propiedades hay disponibles?",
                  "Busco una oficina para alquilar",
                ].map((title, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500">
                      {[
                        "En Asunción para alquiler",
                        "En zona Villamorra o Carmelitas",
                        "En Lambaré con 3 habitaciones",
                        "Con estacionamiento incluido",
                      ][idx]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Input inferior */}
      <div className="fixed bottom-0 left-0 right-0 md:ml-64 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
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
  onOptionClick,
  onLogout,
}: {
  onOptionClick: () => void;
  onLogout: () => void;
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

      {/* Logout */}
      <div className="space-y-6">
        <SidebarButton icon={<FiLogOut />} label="Salir" onClick={onLogout} />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold">
            N
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Nombre</p>
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
