import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useThrottledIsFetching } from "./useThrottledIsFetching";
import { createRefetchWithToast } from "@/lib/queryUtils";

type ModifiedQueryMessages = {
  loading: string;
  success: string;
  error: string;
};

export function useModifiedQuery<TQueryFnData = unknown>({
  messages,
  ...props
}: {
  queryKey: string[];
  messages?: ModifiedQueryMessages;
} & UseQueryOptions<TQueryFnData>) {
  const query = useQuery({
    ...props,
  });

  return {
    ...query,
    throttledIsFetching: useThrottledIsFetching(query.isFetching),
    refetchWithToast: createRefetchWithToast(query, {
      loading: messages?.loading || "Refreshing...",
      success: messages?.success || "Refreshed",
      error: messages?.error || "Failed to refresh",
    }),
  };
}
