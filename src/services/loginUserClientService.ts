import { Usertype } from "@/types/generalTypes"

export default async function loginUserClientService(user:Usertype ) {
 
  try {
    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });

      if (!res.ok) {
        throw new Error("Error al login client");
      }
      
      const data = await res.json();
      
      return data;

  } catch (error: any) {
    console.error(error);
  }
   


}