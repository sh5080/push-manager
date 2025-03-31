"use client";

import { Modal } from "app/common/components/inputs/modal.component";
import { useLoginModal } from "app/common/hooks/useLoginModal.hook";
import { LoginForm } from "./login.component";

export function LoginModal() {
  const { isOpen, onClose } = useLoginModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="로그인"
      size="sm"
      showCloseButton
    >
      <LoginForm />
    </Modal>
  );
}
