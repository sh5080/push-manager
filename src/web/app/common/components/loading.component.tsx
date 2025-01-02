"use client";

import { useLoadingStore } from "../../store";
import LoadingSpinner from "./spinner.component";

export default function LoadingOverlay() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <LoadingSpinner size="lg" color="white" />
    </div>
  );
}
