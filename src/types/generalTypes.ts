
import React from "react";
export type Inputs = {
  name: string;
  email: string;
  password: string;
};

export interface InputTextCom extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  id: string;
};


export interface ChatInputProps {
  message: string;
  onMessageChange: (msg: string) => void;
  onSend: () => void;
}


export interface ChatMessage {
  sender: "user" | "bot";
  type?: "text" | "recommendation";
  content: string;
  items?: { title: string; link: string }[];
}

export interface ChatWindowProps {
  messages: ChatMessage[];
  savedMessages: { title: string; link: string }[];
  chatRef: React.RefObject<HTMLDivElement | null>; 
  onSaveBotMessage: (item: { title: string; link: string }) => void;
}


export  interface SidebarProps {
  onNewChat: () => void;
  onSavedClick: () => void;
  onOptionClick: () => void;
  handleHistoryChats: () => void;
  onHomeClick: () => void;
  suscriptionView: () => void;
  userName: string;
}

export interface Usertype {
  id?: number;
  nombre?: string;
  email: string;
  password: string;
}

export interface PropertyListing {
  id: number;
  titulo: string;
  precio: string;
  zona?: string;
  dormitorios: number;
  banos: number;
  tipo_propiedad?: string;
  estado_propiedad: string;
  estado_publicacion?: string;
  garajes: number;
  es_departamento?: boolean;
  acepta_mascotas?: boolean;
  m2_edificados: string;
  tiene_balcon?: boolean;
  es_casa?: boolean;
  m2_terreno?: string;
  plantas?: number;
  tiene_patio?: boolean;
  ubicacion_descripcion?: string;
  latitud: string;
  longitud: string;
  descripcion: string;
  comodidades: string;
  url: string;
  fecha_entrada: string;       
  fecha_modificacion: string;  
  currency: string;
  ciudad?: string;
}

export interface Favorite {
  id: number;
  usuario_id: number;
  propiedad_id: number;
  fecha_agregado: string;
  usuarios:Usertype;
  propiedades:PropertyListing;
}
