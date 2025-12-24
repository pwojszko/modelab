import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as engineService from "../service/engine";
import type {
  EngineResponse,
  AddRequest,
  MultiplyRequest,
  FactorialRequest,
  ProcessStringRequest,
  SumArrayRequest,
} from "../types";

// Query keys
export const engineKeys = {
  all: ["engine"] as const,
  status: () => [...engineKeys.all, "status"] as const,
  results: () => [...engineKeys.all, "results"] as const,
  result: (key: string) => [...engineKeys.results(), key] as const,
};

// Engine Status Query
export function useEngineStatus() {
  return useQuery<EngineResponse>({
    queryKey: engineKeys.status(),
    queryFn: engineService.getEngineStatus,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Generic engine mutation hook
interface UseEngineMutationOptions<TRequest> {
  key: string;
  mutationFn: (request: TRequest) => Promise<EngineResponse>;
  successMessage: string;
  getDescription?: (data: EngineResponse, variables: TRequest) => string;
  showToast?: boolean;
}

function useEngineMutation<TRequest>({
  key,
  mutationFn,
  successMessage,
  getDescription,
  showToast = true,
}: UseEngineMutationOptions<TRequest>) {
  const queryClient = useQueryClient();
  return useMutation<EngineResponse, Error, TRequest>({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(engineKeys.result(key), data);
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

// Engine Mutations
export function useAddNumbers(showToast: boolean = true) {
  return useEngineMutation<AddRequest>({
    key: "add",
    mutationFn: engineService.addNumbers,
    successMessage: "Numbers added successfully",
    getDescription: (data, variables) =>
      `${variables.a} + ${variables.b} = ${data.result}`,
    showToast,
  });
}

export function useMultiplyNumbers(showToast: boolean = true) {
  return useEngineMutation<MultiplyRequest>({
    key: "multiply",
    mutationFn: engineService.multiplyNumbers,
    successMessage: "Numbers multiplied successfully",
    getDescription: (data, variables) =>
      `${variables.a} × ${variables.b} = ${data.result}`,
    showToast,
  });
}

export function useCalculateFactorial(showToast: boolean = true) {
  return useEngineMutation<FactorialRequest>({
    key: "factorial",
    mutationFn: engineService.calculateFactorial,
    successMessage: "Factorial calculated successfully",
    getDescription: (data, variables) => `${variables.n}! = ${data.result}`,
    showToast,
  });
}

export function useProcessString(showToast: boolean = true) {
  return useEngineMutation<ProcessStringRequest>({
    key: "processString",
    mutationFn: engineService.processString,
    successMessage: "String processed successfully",
    getDescription: (data) => data.message || `Result: ${data.result}`,
    showToast,
  });
}

export function useSumArray(showToast: boolean = true) {
  return useEngineMutation<SumArrayRequest>({
    key: "sumArray",
    mutationFn: engineService.sumArray,
    successMessage: "Array summed successfully",
    getDescription: (data, variables) =>
      `[${variables.numbers.join(", ")}] = ${data.result}`,
    showToast,
  });
}
