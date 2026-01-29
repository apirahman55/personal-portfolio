import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorProvider, ContextAwareCursor } from "@/components/ContextCursor";
import { SocialSidebar } from "@/components/SocialSidebar";
import { AppWrapper } from "@/components/AppWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";

// Space Grotesk - similar to Cabinet Grotesk used by azizkhaldi.com
const spaceGrotesk = Space_Grotesk({
  variable: "--font-cabinet",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Api Al Rahman | Frontend Specialist & Full-Stack Developer",
  description: "Software Engineer with 5+ years of experience specializing in Frontend development with strong Full-Stack capabilities. Expertise in React.js, Next.js, Vue.js, and Go.",
  keywords: ["Software Engineer", "Frontend Specialist", "React", "Next.js", "Vue.js", "Go", "TypeScript", "Full Stack Developer"],
  authors: [{ name: "Api Al Rahman" }],
  openGraph: {
    title: "Api Al Rahman | Frontend Specialist & Full-Stack Developer",
    description: "Software Engineer specializing in React.js, Next.js, Vue.js, and Go. Building healthcare, government, and fintech platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
