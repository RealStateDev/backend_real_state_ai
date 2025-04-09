/*"use client"
import React, { createContext, useContext, useEffect, useState} from "react";
import { Usertype } from "@/types/generalTypes";
import { loginuserService } from "@/services/loginuserService";

interface UserContexProps {
    user: Usertype;
    setUser: ( user: Usertype | null ) => void;
    fetchUser : () => Promise<void>;
}

const UserContext = createContext<UserContexProps | undefined>(undefined);


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Usertype | null>(null);
  
    const fetchUser = async () => {
      try {
        const  data  =  //await axios.get("/api/auth/profile",{ withCredentials: true });
        setUser(data);
      } catch {
        setUser(null);
      }
    };
  
    useEffect(() => {
      // Verifica el token al cargar la app
      fetchUser();
    }, []);
  
    return (
      <UserContext.Provider value={{ user, setUser, fetchUser }}>
        {children}
      </UserContext.Provider>
    );
  };

  */