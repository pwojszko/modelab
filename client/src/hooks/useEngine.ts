import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as engineService from "../service/engine";
import type { EngineResponse } from "../types";
import { createRefetchWithToast } from "../lib/queryUtils";

type EngineQueryKey = "ENGINE" | "ENGINE_STATUS";

export const engineKeys: Record<EngineQueryKey, EngineQueryKey[]> = {
  ENGINE: ["ENGINE"],
  ENGINE_STATUS: ["ENGINE", "ENGINE_STATUS"],
};

export function useEngineStatus() {
  const query = useQuery({
    queryKey: engineKeys.ENGINE_STATUS,
    queryFn: engineService.getEngineStatus,
    refetchInterval: 30000,
  });

  return {
    ...query,
    refetch: createRefetchWithToast(query, {
      loading: "Refreshing engine status...",
      success: "Engine status refreshed",
      error: "Failed to refresh engine status",
    }),
  };
}

interface UseEngineMutationOptions<TRequest> {
  mutationFn: (request: TRequest) => Promise<EngineResponse>;
  successMessage: string;
  getDescription?: (data: EngineResponse, variables: TRequest) => string;
  showToast?: boolean;
  invalidateKeys?: EngineQueryKey[];
}

function useEngineMutation<TRequest>({
  mutationFn,
  successMessage,
  getDescription,
  showToast = true,
  invalidateKeys,
}: UseEngineMutationOptions<TRequest>) {
  const queryClient = useQueryClient();

  return useMutation<EngineResponse, Error, TRequest>({
    mutationFn,
    onSuccess: (data, variables) => {
      if (invalidateKeys) {
        queryClient.invalidateQueries({ queryKey: invalidateKeys });
      }

      if (showToast) {
        toast.success(successMessage, {
          description: getDescription
            ? getDescription(data, variables)
            : data.message || `Result: ${data.result}`,
        });
      }
    },
  });
}

export function useAddNumbers(showToast: boolean = true) {
  return useEngineMutation({
    invalidateKeys: engineKeys.ENGINE,
    mutationFn: engineService.addNumbers,
    successMessage: "Numbers added successfully",
    getDescription: (data, variables) =>
      `${variables.a} + ${variables.b} = ${data.result}`,
    showToast,
  });
}

export function useMultiplyNumbers(showToast: boolean = true) {
  return useEngineMutation({
    invalidateKeys: engineKeys.ENGINE,
    mutationFn: engineService.multiplyNumbers,
    successMessage: "Numbers multiplied successfully",
    getDescription: (data, variables) =>
      `${variables.a} × ${variables.b} = ${data.result}`,
    showToast,
  });
}

export function useCalculateFactorial(showToast: boolean = true) {
  return useEngineMutation({
    invalidateKeys: engineKeys.ENGINE,
    mutationFn: engineService.calculateFactorial,
    successMessage: "Factorial calculated successfully",
    getDescription: (data, variables) => `${variables.n}! = ${data.result}`,
    showToast,
  });
}

export function useProcessString(showToast: boolean = true) {
  return useEngineMutation({
    invalidateKeys: engineKeys.ENGINE,
    mutationFn: engineService.processString,
    successMessage: "String processed successfully",
    getDescription: (data) => data.message || `Result: ${data.result}`,
    showToast,
  });
}

export function useSumArray(showToast: boolean = true) {
  return useEngineMutation({
    invalidateKeys: engineKeys.ENGINE,
    mutationFn: engineService.sumArray,
    successMessage: "Array summed successfully",
    getDescription: (data, variables) =>
      `[${variables.numbers.join(", ")}] = ${data.result}`,
    showToast,
  });
}
