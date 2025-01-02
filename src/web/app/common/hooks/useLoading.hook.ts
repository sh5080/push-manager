import { useState, useCallback } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = useCallback(
    async <T>(callback: () => Promise<T>): Promise<T> => {
      setIsLoading(true);
      try {
        return await callback();
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, withLoading };
};
