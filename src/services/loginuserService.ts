import { Usertype } from "@/types/generalTypes"

export async function loginuserService(req:Usertype) 
{
    try 
    {
      const resp = await fetch('http://localhost:5000/api/auth/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(req)
        }
      )
      const data = await resp.json();
      if (!resp.ok) 
        {
        throw new Error(data||'error en login');
      }  
      return data;
    } catch (error) {
        console.error(error)
    }
}