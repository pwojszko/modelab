import {
  UseQueryResult,
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

export interface RefetchToastMessages {
  loading: string;
  success: string;
  error: string;
}

export interface MutationToastMessages<TResponse, TRequest> {
  loading: string;
  success: (data: TResponse, request: TRequest) => string;
  error: (error: Error) => string;
}

export function createRefetchWithToast<TData, TError>(
  query: UseQueryResult<TData, TError>,
  messages: RefetchToastMessages
) {
  return (
    options?: RefetchOptions
  ): Promise<QueryObserverResult<TData, TError>> => {
    const refetchPromise = query.refetch(options);
    toast.promise(refetchPromise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
    return refetchPromise;
  };
}

export function createMutateWithToast<TRequest, TResponse>(
  mutateAsync: (variables: TRequest) => Promise<TResponse>,
  messages?: MutationToastMessages<TResponse, TRequest>
) {
  return (request: TRequest): Promise<TResponse> => {
    const mutationPromise = mutateAsync(request);
    toast.promise(mutationPromise, {
      loading: messages?.loading || "Processing...",
      success: (data: TResponse) =>
        messages?.success(data, request) || `Success`,
      error: (error: Error) => messages?.error(error) || error.message,
    });
    return mutationPromise;
  };
}
