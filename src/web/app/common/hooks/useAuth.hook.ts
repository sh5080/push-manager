"use client";

import { useState } from "react";
import { useLoginModal } from "../../common/hooks/useLoginModal.hook";
import { authApi } from "app/apis/admin/auth.api";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onClose } = useLoginModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      await authApi.login({ email, password });

      if (pathname === "/auth/login") {
        const callbackUrl = searchParams.get("callbackUrl");

        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push("/admin");
        }
      } else {
        onClose();
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, isLoading, handleLogin };
};
