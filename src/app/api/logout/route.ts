import { NextResponse } from "next/server";
import { serialize } from "cookie";


export async function POST(): Promise<NextResponse> {
  // Creamos una cookie expirando inmediatamente (maxAge: 0)
  const serialized = serialize("tokenJWT", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  const headers = { "Set-Cookie": serialized };

  return NextResponse.json(
    { message: "Logout exitoso" },
    { status: 200, headers }
  );
}
