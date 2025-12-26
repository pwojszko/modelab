import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useThrottledIsFetching } from "./useThrottledIsFetching";

interface UseModifiedMutationOptions<TRequest, TResponse> {
  mutationFn: (request: TRequest) => Promise<TResponse>;
  successMessage?: string;
  getDescription?: (data: TResponse, variables: TRequest) => string;
  invalidateKeys?: string[];
}

export function useModifiedMutation<TRequest, TResponse>({
  mutationFn,
  successMessage,
  getDescription,
  invalidateKeys,
}: UseModifiedMutationOptions<TRequest, TResponse>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponse, Error, TRequest>({
    mutationFn,
    onSuccess: (data, variables) => {
      if (invalidateKeys) {
        queryClient.invalidateQueries({ queryKey: invalidateKeys });
      }

      if (successMessage) {
        toast.success(successMessage, {
          description: getDescription
            ? getDescription(data, variables)
            : `Result: ${data}`,
        });
      }
    },
  });

  return {
    ...mutation,
    throttledIsPending: useThrottledIsFetching(mutation.isPending),
  };
}
