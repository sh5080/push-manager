import type { Metadata } from "next";
import Header from "./common/components/header.component";
import Sidebar from "./common/components/sidebar.component";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoadingStore } from "./store";
import LoadingSpinner from "./common/components/spinner.component";

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
  const isLoading = useLoadingStore((state) => state.isLoading);

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
        <ToastContainer />
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <LoadingSpinner size="lg" color="white" />
          </div>
        )}
      </body>
    </html>
  );
}
