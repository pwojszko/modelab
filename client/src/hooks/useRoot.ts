import { useQuery } from "@tanstack/react-query";
import * as rootService from "../service/root";
import { createRefetchWithToast } from "../lib/queryUtils";

type RootQueryKey = "ROOT" | "HEALTH";

export const rootKeys: Record<RootQueryKey, RootQueryKey[]> = {
  ROOT: ["ROOT"],
  HEALTH: ["ROOT", "HEALTH"],
};

export function useRoot() {
  const query = useQuery({
    queryKey: rootKeys.ROOT,
    queryFn: rootService.getRoot,
  });
  return {
    ...query,
    refetch: createRefetchWithToast(query, {
      loading: "Refreshing root...",
      success: "Root refreshed",
      error: "Failed to refresh root",
    }),
  };
}

export function useHealth() {
  const query = useQuery({
    queryKey: rootKeys.HEALTH,
    queryFn: rootService.getHealth,
    refetchInterval: 30000,
  });
  return {
    ...query,
    refetch: createRefetchWithToast(query, {
      loading: "Refreshing health...",
      success: "Health refreshed",
      error: "Failed to refresh health",
    }),
  };
}
