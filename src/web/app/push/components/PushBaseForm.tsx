"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function PushBaseForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      // TODO api 호출
      router.push("/push/success");
    } catch (error) {
      console.error("푸시 생성 실패:", error);
      // 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  return <form onSubmit={handleSubmit}>{/* 폼 내용 */}</form>;
}
