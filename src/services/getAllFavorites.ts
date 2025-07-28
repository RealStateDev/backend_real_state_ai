
export default async function getAllFavorites() {
 
  try {
    const res = await fetch("http://localhost:4000/api/favoritos", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        throw new Error("Error al obtener todos los favoritos");
      }
      
      const data = await res.json();
      return data;

  } catch (error: any) {
    console.error(error);
  }
}