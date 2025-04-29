"use client";

import React, { useState } from "react";
import { FiMenu, FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";
import { TbLayoutBottombarExpandFilled, TbLayoutNavbarExpandFilled } from "react-icons/tb";
import Sidebar from "@/components/ui/containers/Sidebar";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import useFavoriteHook from "@/hooks/useFavoriteById";

export default function SavedPage() {
  const { user } = useUser();
  const userName = user?.nombre || null;
  const { favorites, favoriteLoading, favoriteError } = useFavoriteHook(user?.id ?? 0);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showMoreInfo, setShowMoreInfo] = useState<number | null>(null);

  const router = useRouter();

  const startNewSession = () => router.push("/homePage");
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
  const suscriptionsView = () => router.push("/suscriptionsPage");

  if (!userName) return null;

  const noFavorites = !favorites?.data || favorites.data.length === 0;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar Desktop */}
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

      {/* Sidebar Mobile */}
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
          <div className="flex-1 bg-white/25" onClick={handleMenuToggle} />
        </div>
      )}

      {/* Contenido Principal */}
      <div className="flex-1 relative">
        <button
          onClick={handleMenuToggle}
          className="md:hidden absolute top-4 left-4 z-50"
        >
          <FiMenu className="w-6 h-6 text-gray-700" />
        </button>

        <main className="px-6 py-10 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Propiedades guardadas</h1>

          {favoriteLoading ? (
            <p className="text-gray-500">Cargando propiedades...</p>
          ) : favoriteError ? (
            <p className="text-red-500">Error al cargar propiedades</p>
          ) : noFavorites ? (
            <p className="text-gray-500">No tienes propiedades guardadas aún.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {favorites!.data.map((fav) => (
                <div
                  key={fav.id}
                  className="border rounded-lg shadow-sm bg-white overflow-hidden transition-all duration-300"
                >
                  {/* Botón título */}
                  <button
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-100 transition"
                    onClick={() => setExpanded(expanded === fav.id ? null : fav.id)}
                  >
                    <span className="font-semibold text-lg">{fav.propiedades.titulo}</span>
                    {expanded === fav.id ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </button>

                  {/* Contenido expandido */}
                  <div
                    className={`transition-all overflow-hidden ${
                      expanded === fav.id ? "max-h-[800px] p-4" : "max-h-0 p-0"
                    }`}
                  >
                    {expanded === fav.id && (
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>💵 Precio:</strong> {fav.propiedades.precio} {fav.propiedades.currency || ''}</p>
                        <p><strong>📍 Zona:</strong> {fav.propiedades.zona}</p>
                        <p><strong>🛏 Dormitorios:</strong> {fav.propiedades.dormitorios}</p>
                        <p><strong>🛁 Baños:</strong> {fav.propiedades.banos}</p>
                        <p><strong>🏡 Tipo:</strong> {fav.propiedades.tipo_propiedad}</p>

                        <a
                          href={fav.propiedades.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline mt-2"
                        >
                          Ver publicación <FiExternalLink />
                        </a>

                        {/* Botón mostrar más */}
                        <button
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-4"
                          onClick={() => setShowMoreInfo(showMoreInfo === fav.id ? null : fav.id)}
                        >
                          {showMoreInfo === fav.id ? (
                            <>
                              Ocultar detalles
                              <TbLayoutBottombarExpandFilled className="w-5 h-5" />
                            </>
                          ) : (
                            <>
                              Más información
                              <TbLayoutNavbarExpandFilled className="w-5 h-5" />
                            </>
                          )}
                        </button>

                        {/* Más detalles */}
                        {showMoreInfo === fav.id && (
                          <div className="mt-4 space-y-1">
                            <p><strong>📐 M2 edificados:</strong> {fav.propiedades.m2_edificados || "N/D"} m²</p>
                            <p><strong>🌳 M2 terreno:</strong> {fav.propiedades.m2_terreno || "N/D"} m²</p>
                            <p><strong>🏠 Plantas:</strong> {fav.propiedades.plantas || "N/D"}</p>
                            <p><strong>📝 Descripción:</strong> {fav.propiedades.descripcion || "Sin descripción"}</p>
                            <p><strong>🎯 Comodidades:</strong> {fav.propiedades.comodidades || "No especificadas"}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
