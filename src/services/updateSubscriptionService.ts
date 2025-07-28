import { Subscripcion } from "@/types/generalTypes";

export default async function updateSubscriptionService(subId : number, updateData : Subscripcion) {
 
    try {
      const res = await fetch(`http://localhost:4000/api/subscripcion/${subId}`, {
          method: "PUT",
          body: JSON.stringify(updateData),
          headers: { "Content-Type": "application/json" }
        });
  
        if (!res.ok) {
          throw new Error("Error al realizar update");
        }
        
        const data = await res.json();
        return data;
  
    } catch (error: any) {
      console.error(error);
    }
  }