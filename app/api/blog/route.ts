import { NextResponse } from "next/server";
import { readBlogPosts, replaceBlogPosts } from "@/app/lib/blog-store";
import { normalizeBlogPosts } from "@/app/lib/blog-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_USERNAME = "moonsilver";
const ADMIN_PASSWORD = "msv";

export async function GET() {
  const posts = await readBlogPosts();
  return NextResponse.json({ posts });
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        username?: unknown;
        password?: unknown;
        posts?: unknown;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const posts = normalizeBlogPosts(body.posts);
  const savedPosts = await replaceBlogPosts(posts);

  return NextResponse.json({ posts: savedPosts });
}
