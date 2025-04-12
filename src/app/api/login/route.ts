import { loginuserService } from "@/services/loginuserService";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return await loginuserService(body);
}
