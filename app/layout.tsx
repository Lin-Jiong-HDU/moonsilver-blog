import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/components/auth-provider";
import { LanguageProvider } from "@/app/components/language-provider";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteNavbar } from "@/app/components/site-navbar";
import { htmlLang, DEFAULT_LANGUAGE } from "@/app/lib/site-language";

export const metadata: Metadata = {
  title: {
    default: "MOONSILVER / 月银",
    template: "%s | MOONSILVER",
  },
  description: "MOONSILVER website / 月银个人站点",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={htmlLang(DEFAULT_LANGUAGE)} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem('site-theme');if(theme!=='light'&&theme!=='dark'){theme=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=theme;}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)] transition-colors duration-300">
              <SiteNavbar />
              <main>{children}</main>
              <SiteFooter />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
