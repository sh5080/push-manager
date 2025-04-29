import type { Metadata } from "next";
import Header from "./common/components/layout/header.component";
import Sidebar from "./common/components/layout/sidebar.component";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "./common/components/feedback/loading.component";
import { ErrorBoundary } from "./common/components/feedback/errorBoundary.component";
import { LoginModal } from "./auth/login/login.modal";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LG SM ADMIN",
  description: "management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKr.className}>
      <body className="min-h-screen">
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <div className="h-16">
              <Header />
            </div>
            <div className="flex flex-1">
              <div className="w-52">
                <Sidebar />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-7xl px-4">{children}</div>
              </div>
            </div>
          </div>
          <ToastContainer />
          <LoadingOverlay />
          <LoginModal />
        </ErrorBoundary>
      </body>
    </html>
  );
}
