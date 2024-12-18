import type { Metadata } from "next";
import Sidebar from "./common/components/sidebar.component";

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
    <html lang="ko">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
