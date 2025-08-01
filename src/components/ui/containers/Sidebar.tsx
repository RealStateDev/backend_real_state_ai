"use client";

import React, { useEffect} from "react";
import { CiCirclePlus, CiFolderOn, CiSearch, CiHome, CiChat1 } from "react-icons/ci";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";
import { SidebarProps } from "@/types/generalTypes";
import logoutClientService from "@/services/logoutClientService";
import { useRouter } from "next/navigation";
import useSubscriptionHook from "@/hooks/useSubscriptionHook";
import { parseISO, isBefore } from "date-fns"
import updateSubscriptionService from "@/services/updateSubscriptionService";

export default function Sidebar({ 
  onNewChat, 
  onSavedClick, 
  onOptionClick, 
  handleHistoryChats, 
  handleAnalytics,
  onHomeClick, 
  suscriptionView,
  userName 
}: SidebarProps) {

  const router = useRouter();

  const handleLogout = async () =>{
    await logoutClientService();
    router.push("/loginPage"); 
  } 

  const {subscription,subscriptionError,subscriptionLoading} = useSubscriptionHook();

  useEffect(() => {
    if (!subscription?.fecha_fin) return;           // si aún no hay data, salir
  
    try {
      const fechaFin = parseISO(subscription.fecha_fin);
  
      // ¿Ya venció? (fechaFin está antes de AHORA)
      const yaVencio = isBefore(fechaFin, new Date());
  
      if (yaVencio) {
        (async () => {
          if (subscription.id) {
            const res = await updateSubscriptionService(subscription.id, {
              activo: false,
            });
            console.log("Venció la suscripción:", res);
          }
        })();
      }
    } catch (err) {
      console.error(err);
    }
  }, [subscription]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold mb-8 mt-8">RealState AI</h2>
        <nav className="space-y-4">
          <SidebarButton icon={<CiCirclePlus />} label="Nuevo chat" onClick={onNewChat} />
          <SidebarButton icon={<CiFolderOn />} label="Propiedades guardadas" onClick={onSavedClick} />
          <SidebarButton icon={<CiSearch />} label="Buscar" onClick={onOptionClick} />
          <SidebarButton icon={<CiChat1 />} label="Historial de Chats" onClick={handleHistoryChats} />
          <SidebarButton icon={<IoAnalyticsSharp  />} label="Analítica" onClick={handleAnalytics} />
        </nav>
      </div>
      <div className="space-y-6 mt-8">
        <SidebarButton icon={<FiLogOut />} label="Salir" onClick={handleLogout} />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
            <BsPersonFill className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{userName || "Usuario"}</p>
            <p className="text-xs text-gray-500">Mi cuenta</p>
            <p className="text-xs text-blue-600">{subscription?.tipo_suscripcion ? subscription?.tipo_suscripcion : 'Plan Free'}</p>
            <button 
              onClick={suscriptionView}
              className="text-xs text-gray-500 hover:underline"
            >
              Actualizar plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function SidebarButton({ icon, label, onClick }: SidebarButtonProps) {
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

