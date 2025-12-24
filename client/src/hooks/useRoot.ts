import { useQuery } from "@tanstack/react-query";
import * as rootService from "../service/root";

// Query keys
export const rootKeys = {
  all: ["root"] as const,
  root: () => [...rootKeys.all, "root"] as const,
  health: () => [...rootKeys.all, "health"] as const,
};

// Get root endpoint
export function useRoot() {
  return useQuery({
    queryKey: rootKeys.root(),
    queryFn: rootService.getRoot,
  });
}

// Get health endpoint
export function useHealth() {
  return useQuery({
    queryKey: rootKeys.health(),
    queryFn: rootService.getHealth,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
