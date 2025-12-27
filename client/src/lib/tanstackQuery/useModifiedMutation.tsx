import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useThrottledIsFetching } from "../tanstackPacer/useThrottledIsFetching";
import { createMutateWithToast } from "./queryUtils";

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
    mutateWithToast: createMutateWithToast(mutation.mutateAsync, messages),
    throttledIsPending: useThrottledIsFetching(mutation.isPending, 500),
  };
}
