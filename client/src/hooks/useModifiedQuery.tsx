import { useQuery } from "@tanstack/react-query";
import { useThrottledIsFetching } from "./useThrottledIsFetching";
import { createRefetchWithToast } from "@/lib/queryUtils";

type ModifiedQueryMessages = {
  loading: string;
  success: string;
  error: string;
};

export function useModifiedQuery<TQueryFnData = unknown>({
  queryKey,
  queryFn,
  refetchInterval,
  messages,
}: {
  queryKey: string[];
  queryFn: () => Promise<TQueryFnData>;
  refetchInterval: number;
  messages: ModifiedQueryMessages;
}) {
  const query = useQuery({
    queryKey,
    queryFn: queryFn,
    refetchInterval,
  });

  return {
    ...query,
    throttledIsFetching: useThrottledIsFetching(query.isFetching),
    refetchWithToast: createRefetchWithToast(query, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }),
  };
}
