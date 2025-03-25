import { Toast } from "app/utils/toast.util";
import { useRef, useState } from "react";

interface UseClipboardOptions {
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
  copyTimeout?: number;
}

/**
 * 클립보드 복사 기능을 제공하는 커스텀 훅
 * @param options 설정 옵션
 * @returns 클립보드 관련 상태 및 메서드
 */
export function useClipboard(options?: UseClipboardOptions) {
  const {
    successMessage = "클립보드에 복사되었습니다.",
    errorMessage = "복사에 실패했습니다.",
    showToast = true,
    copyTimeout = 2000,
  } = options || {};

  const [isCopied, setIsCopied] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);

  /**
   * 텍스트를 클립보드에 복사합니다.
   * @param text 복사할 텍스트
   * @returns 복사 성공 여부
   */
  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!text) return false;

    try {
      if (textInputRef.current) {
        textInputRef.current.value = text;
      }

      // modern clipboard API 시도
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // 구형 브라우저용 fallback
        if (!textInputRef.current) return false;

        textInputRef.current.select();
        textInputRef.current.setSelectionRange(0, 99999);
        const success = document.execCommand("copy");
        if (!success) throw new Error("복사 실패");
      }

      setIsCopied(true);
      if (showToast) {
        Toast.success(successMessage);
      }

      if (copyTimeout > 0) {
        setTimeout(() => setIsCopied(false), copyTimeout);
      }

      return true;
    } catch (err) {
      console.error("클립보드 복사 오류:", err);
      if (showToast) {
        Toast.error(errorMessage);
      }
      return false;
    }
  };

  const resetCopyState = () => {
    setIsCopied(false);
  };

  return { isCopied, copyToClipboard, resetCopyState, textInputRef };
}
