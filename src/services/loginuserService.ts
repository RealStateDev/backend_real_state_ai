import { Usertype } from "@/types/generalTypes"
import { serialize } from "cookie";
import { NextResponse } from "next/server";

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
        throw new Error('error en login');
      }  



      const serialized = serialize("tokenJWT", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      const headers = { "set-Cookie": serialized };

     // return data;

     return NextResponse.json({ message: "Login exitoso", code:0}, { headers });

      
    } catch (error) {
        console.error(error)
    }
}