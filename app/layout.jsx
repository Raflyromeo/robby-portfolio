import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../components/LanguageProvider";
import { cookies } from "next/headers";

export const metadata = {
  metadataBase: new URL("https://robby-portfolio.vercel.app"),
  title: "Robby Ardiansyah Hudaya — UI/UX Designer & Web Developer",
  description: "Portfolio of Robby Ardiansyah Hudaya, an Information Systems student at Gunadarma University focused on UI/UX Design, Front-End Development, and Web Development.",
  authors: [{ name: "Robby Ardiansyah Hudaya" }],
  openGraph: {
    title: "Robby Ardiansyah Hudaya — UI/UX Designer & Web Developer",
    description: "Portfolio of Robby Ardiansyah Hudaya, an Information Systems student at Gunadarma University focused on UI/UX Design, Front-End Development, and Web Development.",
    url: "https://robby-portfolio.vercel.app",
    siteName: "Robby Ardiansyah Hudaya Portfolio",
    images: [
      {
        url: "/images/profile/Robby.png",
        width: 1200,
        height: 630,
        alt: "Robby Ardiansyah Hudaya - Portfolio",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robby Ardiansyah Hudaya - Web Developer",
    description: "Personal portfolio of Robby Ardiansyah Hudaya, showcasing web development, design, and analysis.",
    images: ["/images/profile/Robby.png"],
  },
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const langCookie = cookieStore.get('portfolio-language');
  const defaultLang = langCookie ? langCookie.value : 'id';

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider defaultLanguage={defaultLang}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
