import { NextResponse } from "next/server";
import { type StoredUser } from "@/app/lib/auth-data";
import { readAccounts } from "@/app/lib/auth-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ActionBody = {
  username?: unknown;
  password?: unknown;
};

function buildSession(user: StoredUser) {
  return {
    username: user.username,
    password: user.password,
    isAdmin: user.isAdmin,
  };
}

export async function GET() {
  const users = await readAccounts();
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ActionBody | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password.trim() : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const users = await readAccounts();
  const matched = users.find((user) => user.username === username && user.password === password);

  if (!matched) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  return NextResponse.json({ user: buildSession(matched) });
}
