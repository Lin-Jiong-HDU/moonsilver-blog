import { NextResponse } from "next/server";
import { ADMIN_USER, type StoredUser } from "@/app/lib/auth-data";
import { readUsers, replaceUsers } from "@/app/lib/auth-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ActionBody = {
  action?: unknown;
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
  const users = await readUsers();
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ActionBody | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const action = typeof body.action === "string" ? body.action : "";
  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password.trim() : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  if (action === "login") {
    const users = await readUsers();
    const matched = users.find((user) => user.username === username && user.password === password);

    if (!matched) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    return NextResponse.json({ user: buildSession(matched) });
  }

  if (action === "register") {
    const users = await readUsers();
    if (users.some((user) => user.username === username)) {
      return NextResponse.json({ error: "Username already exists." }, { status: 409 });
    }

    const nextUser: StoredUser = {
      username,
      password,
      isAdmin: username === ADMIN_USER.username && password === ADMIN_USER.password,
    };

    const savedUsers = await replaceUsers([...users, nextUser]);
    const matched = savedUsers.find((user) => user.username === username) ?? nextUser;

    return NextResponse.json({ user: buildSession(matched) });
  }

  return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
}
