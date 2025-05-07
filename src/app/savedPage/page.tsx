"use client";

import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiTrash2,
} from "react-icons/fi";
import {
  TbLayoutBottombarExpandFilled,
  TbLayoutNavbarExpandFilled,
} from "react-icons/tb";
import Sidebar from "@/components/ui/containers/Sidebar";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import useFavoriteHook from "@/hooks/useFavoriteById";
import deleteFavorite from "@/services/deleteFavorite";


export default function SavedPage() {
  const { user } = useUser();
  const userName = user?.nombre || null;
  const { favorites, favoriteLoading, favoriteError } = useFavoriteHook(
    user?.id ?? 0
  );

  const [favList, setFavList] = useState<any[]>([]);
  useEffect(() => {
    if (favorites?.data) {
      setFavList(favorites.data);
    }
  }, [favorites?.data]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showMoreInfo, setShowMoreInfo] = useState<number | null>(null);

  const router = useRouter();
  const startNewSession = () => router.push("/homePage");
  const handleMenuToggle = () => setSidebarOpen((o) => !o);
  const handleGoToSaved = () => router.push("/savedPage");
  const handleGoHome = () => router.push("/homePage");
  const handleHistoryChats = () => router.push("/chatHistoryPage");
  const handleAnalytics = () => router.push("/reportsPage");
  const suscriptionsView = () => router.push("/suscriptionsPage");

  const removeFavorite = async (id: number) => {
    setFavList((prev) => prev.filter((f) => f.id !== id));
    try {
      const res = await deleteFavorite(id);
      if (res.code !== 1) {
        console.error("Error al borrar en servidor:", res);
      }
    } catch (err) {
      console.error("Error en petición de borrado:", err);
    }
  };

  if (!userName) return null;
  const noFavorites = favList.length === 0;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 p-6 flex-col justify-between">
        <Sidebar
          onNewChat={startNewSession}
          onSavedClick={handleGoToSaved}
          onOptionClick={handleMenuToggle}
          userName={userName}
          onHomeClick={handleGoHome}
          handleHistoryChats={handleHistoryChats}
          handleAnalytics={handleAnalytics}
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
              onOptionClick={handleMenuToggle}
              userName={userName}
              onHomeClick={handleGoHome}
              handleHistoryChats={handleHistoryChats}
              handleAnalytics={handleAnalytics}
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
            <p className="text-gray-500">
              No tienes propiedades guardadas aún.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {favList.map((fav) => (
                <div
                  key={fav.id}
                  className="border rounded-lg shadow-sm bg-white overflow-hidden transition-all duration-300 relative"
                >
                  {/* Header */}
                  <button
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-100 transition h-14"
                    onClick={() =>
                      setExpanded(expanded === fav.id ? null : fav.id)
                    }
                  >
                    <span className="font-semibold text-lg">
                      {fav.propiedades.titulo}
                    </span>
                    {expanded === fav.id ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </button>

                  {/* Basurero */}
                  {expanded === fav.id && (
                    <button
                      className="absolute right-4 top-14 p-0"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      <FiTrash2 className="text-gray-500 hover:text-red-500" />
                    </button>
                  )}

                  {/* Contenido Expandido */}
                  <div
                    className={`transition-all overflow-hidden ${
                      expanded === fav.id ? "max-h-[800px] p-4" : "max-h-0 p-0"
                    }`}
                  >
                    {expanded === fav.id && (
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Texto */}
                        <div className="flex-1 text-sm text-gray-700 space-y-2">
                          <p>
                            <strong>💵 Precio:</strong> {fav.propiedades.precio}{" "}
                            {fav.propiedades.currency}
                          </p>
                          <p>
                            <strong>📍 Zona:</strong> {fav.propiedades.zona}
                          </p>
                          <p>
                            <strong>🛏 Dormitorios:</strong>{" "}
                            {fav.propiedades.dormitorios}
                          </p>
                          <p>
                            <strong>🛁 Baños:</strong> {fav.propiedades.banos}
                          </p>
                          <p>
                            <strong>🏡 Tipo:</strong>{" "}
                            {fav.propiedades.tipo_propiedad}
                          </p>
                          <p>
                            <strong>🏷️ Tipo de Operación:</strong>{" "}
                            Alquiler
                          </p>
                          <a
                            href={`/mapPage?lat=${fav.propiedades.latitud}&lng=${fav.propiedades.longitud}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:underline mt-2"
                          >
                            Ver mapa <FiExternalLink />
                          </a>
                          <a
                            href={fav.propiedades.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:underline mt-2"
                          >
                            Ver publicación <FiExternalLink />
                          </a>
                          {/* Más campos si los necesitas */}
                          <button
                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-4"
                            onClick={() =>
                              setShowMoreInfo(
                                showMoreInfo === fav.id ? null : fav.id
                              )
                            }
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
                          {showMoreInfo === fav.id && (
                            <div className="mt-4 space-y-1">
                              <p>
                                <strong>📐 M2 edificados:</strong>{" "}
                                {fav.propiedades.m2_edificados || "N/D"} m²
                              </p>
                              <p>
                                <strong>🌳 M2 terreno:</strong>{" "}
                                {fav.propiedades.m2_terreno || "N/D"} m²
                              </p>
                              <p>
                                <strong>🏠 Plantas:</strong>{" "}
                                {fav.propiedades.plantas || "N/D"}
                              </p>
                              <p>
                                <strong>📝 Descripción:</strong>{" "}
                                {fav.propiedades.descripcion ||
                                  "Sin descripción"}
                              </p>
                              <p>
                                <strong>🎯 Comodidades:</strong>{" "}
                                {fav.propiedades.comodidades ||
                                  "No especificadas"}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Imagen */}
                        <div className="md:w-1/3 h-48 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 ml-4 md:ml-8 mr-12">
                          <img
                            src={fav.propiedades.image_url}
<<<<<<< Updated upstream
                            alt="Property Image"
=======
                            alt="property image"
>>>>>>> Stashed changes
                            className="w-full h-full object-cover"
                          />
                        </div>
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
