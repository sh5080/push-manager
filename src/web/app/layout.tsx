import type { Metadata } from "next";
import Header from "./common/components/header.component";
import Sidebar from "./common/components/sidebar.component";
import { Noto_Sans_KR } from "next/font/google";
import { LoadingProvider } from "./contexts/loading.context";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Push Manager",
  description: "Push notification management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <body className="min-h-screen">
        <LoadingProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <div
              style={{
                height: "64px",
                // border: '4px solid red'
              }}
            >
              <Header />
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <div
                style={{
                  width: "200px",
                  // border: '4px solid green'
                }}
              >
                <Sidebar />
              </div>
              <div
                style={{
                  // flex: 1,
                  // border: '4px solid blue',
                  padding: "1rem",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
