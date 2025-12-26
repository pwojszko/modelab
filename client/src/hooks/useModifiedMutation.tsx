import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useThrottledIsFetching } from "./useThrottledIsFetching";

type ModifiedMutationMessages<TResponse, TRequest> = {
  loading: string;
  success: (data: TResponse, request: TRequest) => string;
  error: (error: Error) => string;
};

export function useModifiedMutation<TRequest, TResponse>({
  messages,
  invalidateKeys = [],
  ...props
}: {
  messages?: ModifiedMutationMessages<TResponse, TRequest>;
  invalidateKeys?: string[];
} & UseMutationOptions<TResponse, Error, TRequest>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResponse, Error, TRequest>({
    ...props,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateKeys });
    },
  });

  return {
    ...mutation,
    mutateWithToast: (request: TRequest) =>
      toast.promise(mutation.mutateAsync(request), {
        loading: messages?.loading || "Processing...",
        success: (data: TResponse) =>
          messages?.success(data, request) || `Success`,
        error: (error: Error) => messages?.error(error) || error.message,
      }),
    throttledIsPending: useThrottledIsFetching(mutation.isPending, 500),
  };
}
