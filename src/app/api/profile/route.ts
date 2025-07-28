import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tokenJWT")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch("http://localhost:4000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Error al obtener perfil");
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
