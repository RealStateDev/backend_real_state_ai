export default async function getSubscriptionByUser(userId:number) {
 
    try {
      const res = await fetch(`http://localhost:4000/api/subscripcionByUser/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
  
        if (!res.ok) {
          throw new Error("Error al obtener la subscripción del user");
        }
        
        const data = await res.json();
        return data;
  
    } catch (error: any) {
      console.error(error);
    }
  }