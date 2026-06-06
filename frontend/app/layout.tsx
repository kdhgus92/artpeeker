import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artpeeker",
  description:
    "간편한 소셜 로그인으로 작품을 발견하고 저장하고 다시 감상해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
