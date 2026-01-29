import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorProvider, ContextAwareCursor } from "@/components/ContextCursor";
import { SocialSidebar } from "@/components/SocialSidebar";
import { AppWrapper } from "@/components/AppWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PersonSchema, WebSiteSchema } from "@/components/seo/JsonLd";

// Space Grotesk - similar to Cabinet Grotesk used by azizkhaldi.com
const spaceGrotesk = Space_Grotesk({
  variable: "--font-cabinet",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = "https://apialrahman.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  
  // Basic metadata
  title: {
    default: "Api Al Rahman | Frontend Specialist & Full-Stack Developer",
    template: "%s | Api Al Rahman",
  },
  description: "Software Engineer with 5+ years of experience specializing in Frontend development with strong Full-Stack capabilities. Expertise in React.js, Next.js, Vue.js, and Go. Building healthcare, government, and fintech platforms.",
  keywords: [
    "Api Al Rahman",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Vue.js Developer",
    "Go Developer",
    "TypeScript",
    "Portfolio",
    "Web Developer Indonesia",
    "Bekasi",
  ],
  authors: [{ name: "Api Al Rahman", url: BASE_URL }],
  creator: "Api Al Rahman",
  publisher: "Api Al Rahman",
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // Manifest
  manifest: "/site.webmanifest",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
    url: BASE_URL,
    siteName: "Api Al Rahman Portfolio",
    title: "Api Al Rahman | Frontend Specialist & Full-Stack Developer",
    description: "Software Engineer specializing in React.js, Next.js, Vue.js, and Go. Building healthcare, government, and fintech platforms.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Api Al Rahman - Frontend Specialist & Full-Stack Developer",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Api Al Rahman | Frontend Specialist & Full-Stack Developer",
    description: "Software Engineer with 5+ years experience. React, Next.js, Vue.js, Go.",
    images: ["/og-image.png"],
    creator: "@apialrahman",
  },
  
  // Verification (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  
  // Alternate languages
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "id-ID": `${BASE_URL}/id`,
    },
  },
  
  // Category
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <PersonSchema />
        <WebSiteSchema />
      </head>
      <body
        className={`${spaceGrotesk.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-cabinet), system-ui, sans-serif" }}
      >
        <ThemeProvider>
          <CursorProvider>
            <AppWrapper>
              <SmoothScroll>
                <ContextAwareCursor />
                <SocialSidebar />
                <Header />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </SmoothScroll>
            </AppWrapper>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

