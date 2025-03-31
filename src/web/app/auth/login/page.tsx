"use client";

import { Suspense } from "react";
import { LoginForm } from "./login.component";
import LoadingOverlay from "@commonComponents/feedback/loading.component";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
        <Suspense fallback={<LoadingOverlay />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
