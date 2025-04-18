import { loginuserService } from "@/services/loginuserService";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return loginuserService(body);   // sin await extra
}
