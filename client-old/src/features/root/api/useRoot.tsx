import * as rootService from "./root";
import { useModifiedQuery } from "../../../lib/tanstackQuery/useModifiedQuery";

type RootQueryKey = "ROOT" | "HEALTH";

export const rootKeys: Record<RootQueryKey, RootQueryKey[]> = {
  ROOT: ["ROOT"],
  HEALTH: ["ROOT", "HEALTH"],
};

export function useRoot() {
  return useModifiedQuery({
    queryKey: rootKeys.ROOT,
    queryFn: rootService.getRoot,
    refetchInterval: 30000,
    messages: {
      loading: "Refreshing root...",
      success: "Root refreshed",
      error: "Failed to refresh root",
    },
  });
}

export function useHealth() {
  return useModifiedQuery({
    queryKey: rootKeys.HEALTH,
    queryFn: rootService.getHealth,
    refetchInterval: 30000,
    messages: {
      loading: "Refreshing health...",
      success: "Health refreshed",
      error: "Failed to refresh health",
    },
  });
}
