import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const Toast = {
  success(message: string, options?: ToastOptions) {
    return toast.success(message, { ...defaultOptions, ...options });
  },

  error(message: string, options?: ToastOptions) {
    return toast.error(message, { ...defaultOptions, ...options });
  },

  info(message: string, options?: ToastOptions) {
    return toast.info(message, { ...defaultOptions, ...options });
  },

  warning(message: string, options?: ToastOptions) {
    return toast.warning(message, { ...defaultOptions, ...options });
  },

  // 커스텀 토스트
  custom(message: string, options?: ToastOptions) {
    return toast(message, { ...defaultOptions, ...options });
  },

  // 로딩 토스트
  loading(message: string = "처리중...", options?: ToastOptions) {
    return toast.loading(message, { ...defaultOptions, ...options });
  },

  // 로딩 토스트 업데이트
  update(toastId: string, message: string, type: "success" | "error") {
    toast.update(toastId, {
      render: message,
      type,
      isLoading: false,
      autoClose: 3000,
    });
  },

  // 모든 토스트 제거
  dismiss() {
    toast.dismiss();
  },
};
