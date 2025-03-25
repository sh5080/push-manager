import React, { ReactNode } from "react";
import { useClipboard } from "app/common/hooks/useClipboard.hook";
import { HiClipboard } from "react-icons/hi";
import { Button } from "@commonComponents/inputs/button.component";

interface ClipboardProps {
  text: string;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  readOnly?: boolean;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
  onCopySuccess?: () => void;
  onCopyError?: () => void;
  onChange?: (value: string) => void;
}

export const Clipboard: React.FC<ClipboardProps> = ({
  text,
  className = "flex items-center",
  inputClassName = "w-full p-2 border rounded-l",
  placeholder = "",
  readOnly = true,
  successMessage,
  errorMessage,
  showToast = true,
  onCopySuccess,
  onCopyError,
  onChange,
}) => {
  const { isCopied, copyToClipboard, textInputRef } = useClipboard({
    successMessage,
    errorMessage,
    showToast,
  });

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success && onCopySuccess) {
      onCopySuccess();
    } else if (!success && onCopyError) {
      onCopyError();
    }
  };

  return (
    <div className={className}>
      <input
        type="text"
        value={text}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        className={inputClassName}
      />
      <Button
        variant="square-line"
        size="32"
        onClick={handleCopy}
        className="!px-2"
        title="복사"
      >
        <HiClipboard className="w-4 h-4" />
      </Button>

      {/* 숨겨진 input 요소 (복사용) */}
      <input
        ref={textInputRef}
        type="text"
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        readOnly
      />
    </div>
  );
};

export default Clipboard;
