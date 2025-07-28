import { Subscripcion } from "@/types/generalTypes";

export default async function createSubscription(dataEntry:Subscripcion) {
 
    try {
      const res = await fetch(`http://localhost:4000/api/subscripcion`, {
          method: "POST",
          body: JSON.stringify(dataEntry),
          headers: { "Content-Type": "application/json" }
        });
  
        if (!res.ok) {
          throw new Error("Error al crear la subscripción");
        }
        
        const data = await res.json();
        return data;
  
    } catch (error: any) {
      console.error(error);
    }
  }