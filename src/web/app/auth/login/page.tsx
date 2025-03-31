"use client";

import { LoginForm } from "./login.component";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          로그인
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
