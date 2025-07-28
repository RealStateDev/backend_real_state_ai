export default async function getFavoritePropertyByUser(userId:number) {
 
    try {
      const res = await fetch(`http://localhost:4000/api/favoritosByUser/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
  
        if (!res.ok) {
          throw new Error("Error al obtener los favoritos del user");
        }
        
        const data = await res.json();
        return data;
  
    } catch (error: any) {
      console.error(error);
    }
  }