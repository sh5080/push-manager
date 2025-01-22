import type { Metadata } from "next";
import Header from "./common/components/header.component";
import Sidebar from "./common/components/sidebar.component";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./common/components/loading.component";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div style={{ height: "64px" }}>
            <Header />
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ width: "200px" }}>
              <Sidebar />
            </div>
            <div style={{ padding: "1rem" }}>{children}</div>
          </div>
        </div>
        <ToastContainer />
        <LoadingOverlay />
      </body>
    </html>
  );
}
