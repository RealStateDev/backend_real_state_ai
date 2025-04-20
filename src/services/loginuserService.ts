import { Usertype } from "@/types/generalTypes";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function loginuserService(req: Usertype) {
  try {
    const resp = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return NextResponse.json(
        { message: data.error || "Credenciales incorrectas", code: 1 },
        { status: 401 }
      );
    }

    // Login correcto
    const serialized = serialize("tokenJWT", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // un dia 
      path: "/",
    });

    const headers = { "Set-Cookie": serialized }; //  Set‑Cookie en mayúsculas

    return NextResponse.json(
      {
        message: "Login exitoso",
        code: 0,
        userId: data.userId,
        nombre: data.nombre,
      },
      { headers }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error inesperado en el servidor", code: 2 },
      { status: 500 }
    );
  }
}
