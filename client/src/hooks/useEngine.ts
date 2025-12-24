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

// Engine Mutations
export function useAddNumbers() {
  const queryClient = useQueryClient();
  return useMutation<EngineResponse, Error, AddRequest>({
    mutationFn: engineService.addNumbers,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(engineKeys.result("add"), data);
      toast.success("Numbers added successfully", {
        description: `${variables.a} + ${variables.b} = ${data.result}`,
      });
    },
  });
}

export function useMultiplyNumbers() {
  const queryClient = useQueryClient();
  return useMutation<EngineResponse, Error, MultiplyRequest>({
    mutationFn: engineService.multiplyNumbers,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(engineKeys.result("multiply"), data);
      toast.success("Numbers multiplied successfully", {
        description: `${variables.a} × ${variables.b} = ${data.result}`,
      });
    },
  });
}

export function useCalculateFactorial() {
  const queryClient = useQueryClient();
  return useMutation<EngineResponse, Error, FactorialRequest>({
    mutationFn: engineService.calculateFactorial,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(engineKeys.result("factorial"), data);
      toast.success("Factorial calculated successfully", {
        description: `${variables.n}! = ${data.result}`,
      });
    },
  });
}

export function useProcessString() {
  const queryClient = useQueryClient();
  return useMutation<EngineResponse, Error, ProcessStringRequest>({
    mutationFn: engineService.processString,
    onSuccess: (data) => {
      queryClient.setQueryData(engineKeys.result("processString"), data);
      toast.success("String processed successfully", {
        description: data.message || `Result: ${data.result}`,
      });
    },
  });
}

export function useSumArray() {
  const queryClient = useQueryClient();
  return useMutation<EngineResponse, Error, SumArrayRequest>({
    mutationFn: engineService.sumArray,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(engineKeys.result("sumArray"), data);
      toast.success("Array summed successfully", {
        description: `[${variables.numbers.join(", ")}] = ${data.result}`,
      });
    },
  });
}

// Helper hook to get engine result by key
export function useEngineResult(key: string) {
  return useQuery<EngineResponse>({
    queryKey: engineKeys.result(key),
    enabled: false, // Only fetch when explicitly set via setQueryData
  });
}
