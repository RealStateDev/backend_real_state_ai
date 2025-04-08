
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
  chatRef: React.RefObject<HTMLDivElement | null>; // ✅ Aquí está el cambio
  onSaveBotMessage: (item: { title: string; link: string }) => void;
}


export  interface SidebarProps {
  onNewChat: () => void;
  onSavedClick: () => void;
  onOptionClick: () => void;
  handleHistoryChats: () => void;
  onLogout: () => void;
  onHomeClick: () => void;
  userName: string;
}

export interface Usertype {
  nombre?: string;
  email: string;
  password: string;
}