import { UseQueryResult } from "@tanstack/react-query";
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
  return (showToast: boolean = true) => {
    if (showToast) {
      toast.promise(query.refetch(), {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      });
    } else {
      query.refetch();
    }
  };
}

