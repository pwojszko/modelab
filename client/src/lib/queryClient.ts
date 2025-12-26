import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

const queryCache = new QueryCache({
  onError: (error) => {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    toast.error("Request failed", {
      description: errorMessage,
    });
  },
});

const mutationCache = new MutationCache({
  onError: (error) => {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    toast.error("Operation failed", {
      description: errorMessage,
    });
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});
