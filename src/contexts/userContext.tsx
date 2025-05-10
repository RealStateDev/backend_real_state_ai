"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Usertype } from "@/types/generalTypes";
import calculateAge from "@/utils/calculateAge";

interface UserContexProps {
  user: Usertype | null;
  setUser: (user: Usertype | null) => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContexProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usertype | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "GET",
      });

      if (!res.ok) throw new Error("No autorizado");

      const data = await res.json();
      const fechaNacimiento = data.fecha_nacimiento;
      const edad = calculateAge(fechaNacimiento);
      data.age = edad;
      setUser(data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder fácilmente al contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return context;
};
