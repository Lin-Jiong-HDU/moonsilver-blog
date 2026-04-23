import type { Metadata } from "next";
import { AccountClient } from "@/app/account/account-client";

export const metadata: Metadata = {
  title: "Account / 账号",
  description: "Sign in and access site permissions / 登录与站点权限入口。",
};

export default function AccountPage() {
  return <AccountClient />;
}
