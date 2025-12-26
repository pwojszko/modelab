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
