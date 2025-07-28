import { Usertype } from "@/types/generalTypes"

export async function registeruserService(req:Usertype) 
{
    try 
    {
      const resp = await fetch('http://localhost:4000/api/auth/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(req)
        }
      )
      const data = await resp.json();
      if (!resp.ok) 
        {
        throw new Error(data||'error en register');
      }  
      return data;
    } catch (error) {
        console.error(error)
    }
}