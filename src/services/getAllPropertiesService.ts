import { PropertyListing } from "@/types/generalTypes"

export default async function getAllPropertiesService() {
 
  try {
    const res = await fetch("http://localhost:4000/api/propiedades", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        throw new Error("Error al obtener las propiedades");
      }
      
      const data = await res.json();
      return data;

  } catch (error: any) {
    console.error(error);
  }
}