import { useQuery } from "@tanstack/react-query";
import * as engineService from "../../../service/engine";
import { createRefetchWithToast } from "../../../lib/queryUtils";
import { useModifiedQuery } from "@/hooks/useModifiedQuery";
import { useModifiedMutation } from "@/hooks/useModifiedMutation";

type EngineQueryKey = "ENGINE" | "ENGINE_STATUS" | "ENGINE_CALCULATIONS";

export const engineKeys: Record<EngineQueryKey, EngineQueryKey[]> = {
  ENGINE: ["ENGINE"],
  ENGINE_STATUS: ["ENGINE", "ENGINE_STATUS"],
  ENGINE_CALCULATIONS: ["ENGINE", "ENGINE_CALCULATIONS"],
};

export function useEngineStatus() {
  return useModifiedQuery({
    queryKey: engineKeys.ENGINE_STATUS,
    queryFn: engineService.getEngineStatus,
    refetchInterval: 30000,
    messages: {
      loading: "Refreshing engine status...",
      success: "Engine status refreshed",
      error: "Failed to refresh engine status",
    },
  });
}

export function useAddNumbers() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.addNumbers,
    successMessage: "Numbers added successfully",
    getDescription: (data, variables) =>
      `${variables.a} + ${variables.b} = ${data.result}`,
  });
}

export function useMultiplyNumbers() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.multiplyNumbers,
    successMessage: "Numbers multiplied successfully",
    getDescription: (data, variables) =>
      `${variables.a} × ${variables.b} = ${data.result}`,
  });
}

export function useCalculateFactorial() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.calculateFactorial,
    successMessage: "Factorial calculated successfully",
    getDescription: (data, variables) => `${variables.n}! = ${data.result}`,
  });
}

export function useProcessString() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.processString,
    successMessage: "String processed successfully",
    getDescription: (data) => data.message || `Result: ${data.result}`,
  });
}

export function useSumArray() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.sumArray,
    successMessage: "Array summed successfully",
    getDescription: (data, variables) =>
      `[${variables.numbers.join(", ")}] = ${data.result}`,
  });
}

export function useCalculations() {
  const query = useQuery({
    queryKey: engineKeys.ENGINE_CALCULATIONS,
    queryFn: engineService.getCalculations,
  });

  return {
    ...query,
    refetch: createRefetchWithToast(query, {
      loading: "Refreshing calculations...",
      success: "Calculations refreshed",
      error: "Failed to refresh calculations",
    }),
  };
}
