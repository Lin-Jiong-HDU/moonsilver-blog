import type { Metadata } from "next";
import { AccountClient } from "@/app/account/account-client";

export const metadata: Metadata = {
  title: "账号",
  description: "登录与站点权限入口。",
};

export default function AccountPage() {
  return <AccountClient />;
}
