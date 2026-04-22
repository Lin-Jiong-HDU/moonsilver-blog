import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { ADMIN_USER, normalizeUsers, type StoredUser } from "@/app/lib/auth-data";

const AUTH_STORE_PATH = path.join(process.cwd(), "data", "accounts.json");

async function ensureStoreFile() {
  await mkdir(path.dirname(AUTH_STORE_PATH), { recursive: true });

  try {
    await readFile(AUTH_STORE_PATH, "utf8");
  } catch {
    await writeFile(AUTH_STORE_PATH, JSON.stringify([ADMIN_USER], null, 2), "utf8");
  }
}

export async function readAccounts(): Promise<StoredUser[]> {
  await ensureStoreFile();

  try {
    const raw = await readFile(AUTH_STORE_PATH, "utf8");
    const users = normalizeUsers(JSON.parse(raw) as unknown);

    if (users.length === 0) {
      await writeFile(AUTH_STORE_PATH, JSON.stringify([ADMIN_USER], null, 2), "utf8");
      return [ADMIN_USER];
    }

    return users;
  } catch {
    await writeFile(AUTH_STORE_PATH, JSON.stringify([ADMIN_USER], null, 2), "utf8");
    return [ADMIN_USER];
  }
}
