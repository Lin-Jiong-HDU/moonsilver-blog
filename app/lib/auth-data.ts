export type StoredUser = {
  username: string;
  password: string;
  isAdmin: boolean;
};

export type AuthUser = StoredUser;

export const ADMIN_USER: StoredUser = {
  username: "moonsilver",
  password: "msv",
  isAdmin: true,
};

function normalizeBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

export function normalizeUsers(value: unknown): StoredUser[] {
  if (!Array.isArray(value)) {
    return [ADMIN_USER];
  }

  const users = value
    .map((item) => {
      if (typeof item !== "object" || item === null) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const username = typeof record.username === "string" ? record.username.trim() : "";
      const password = typeof record.password === "string" ? record.password : "";
      const isAdmin = normalizeBoolean(record.isAdmin);

      if (!username || !password) {
        return null;
      }

      return {
        username,
        password,
        isAdmin,
      } satisfies StoredUser;
    })
    .filter((user): user is StoredUser => Boolean(user));

  if (!users.some((user) => user.username === ADMIN_USER.username)) {
    users.unshift(ADMIN_USER);
  }

  return users.length > 0 ? users : [ADMIN_USER];
}
