import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { AuthProvider } from "@/app/components/auth-provider";
import { LanguageProvider } from "@/app/components/language-provider";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteNavbar } from "@/app/components/site-navbar";
import { htmlLang, LANGUAGE_COOKIE, normalizeSiteLanguage } from "@/app/lib/site-language";

export const metadata: Metadata = {
  title: {
    default: "MOONSILVER",
    template: "%s | MOONSILVER",
  },
  description: "MOONSILVER website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storedLanguage = cookies().get(LANGUAGE_COOKIE)?.value;
  const language = normalizeSiteLanguage(storedLanguage);

  return (
    <html lang={htmlLang(language)} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem('site-theme');if(theme!=='light'&&theme!=='dark'){theme=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=theme;}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <LanguageProvider initialLanguage={language}>
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
