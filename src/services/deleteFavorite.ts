export default async function deleteFavorite(id:number) {
 
    try {
      const res = await fetch(`http://localhost:4000/api/favoritos/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
  
        if (!res.ok) {
          throw new Error("Error al eliminar el favorito");
        }
        
        const data = await res.json();
        return data;
  
    } catch (error: any) {
      console.error(error);
    }
  }