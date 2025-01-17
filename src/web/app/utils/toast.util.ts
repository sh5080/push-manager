import { toast, ToastOptions, Id } from "react-toastify";

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

  custom(message: string, options?: ToastOptions) {
    return toast(message, { ...defaultOptions, ...options });
  },

  loading(message: string = "처리중...", options?: ToastOptions) {
    return toast.loading(message, { ...defaultOptions, ...options });
  },

  update(toastId: Id, message: string, type: "success" | "error") {
    toast.update(toastId, {
      render: message,
      type,
      isLoading: false,
      autoClose: 2000,
    });
  },

  dismiss() {
    toast.dismiss();
  },
};
