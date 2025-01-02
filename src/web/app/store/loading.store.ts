import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>()(
  devtools(
    (set) => ({
      isLoading: false,
      setIsLoading: (loading) =>
        set({ isLoading: loading }, false, "setIsLoading"),
    }),
    {
      name: "LoadingStore",
    }
  )
);
