import * as engineService from "./engine";
import { useModifiedQuery } from "@/lib/tanstackQuery/useModifiedQuery";
import { useModifiedMutation } from "@/lib/tanstackQuery/useModifiedMutation";

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
    messages: {
      loading: "Adding numbers...",
      success: (data, request) =>
        `Numbers added successfully: ${request.a} + ${request.b} = ${data.result}`,
      error: (error) => `Failed to add numbers: ${error.message}`,
    },
  });
}

export function useMultiplyNumbers() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.multiplyNumbers,
    messages: {
      loading: "Multiplying numbers...",
      success: (data, request) =>
        `Numbers multiplied successfully: ${request.a} * ${request.b} = ${data.result}`,
      error: (error) => `Failed to multiply numbers: ${error.message}`,
    },
  });
}

export function useCalculateFactorial() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.calculateFactorial,
    messages: {
      loading: "Calculating factorial...",
      success: (data, request) =>
        `Factorial calculated successfully: ${request.n}! = ${data.result}`,
      error: (error) => `Failed to calculate factorial: ${error.message}`,
    },
  });
}

export function useProcessString() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.processString,
    messages: {
      loading: "Processing string...",
      success: (data, request) =>
        `String processed successfully: ${request.text} = ${data.result}`,
      error: (error) => `Failed to process string: ${error.message}`,
    },
  });
}

export function useSumArray() {
  return useModifiedMutation({
    invalidateKeys: engineKeys.ENGINE_CALCULATIONS,
    mutationFn: engineService.sumArray,
    messages: {
      loading: "Summing array...",
      success: (data, request) =>
        `Array summed successfully: ${request.numbers.join(", ")} = ${
          data.result
        }`,
      error: (error) => `Failed to sum array: ${error.message}`,
    },
  });
}

export function useCalculations() {
  return useModifiedQuery({
    queryKey: engineKeys.ENGINE_CALCULATIONS,
    queryFn: engineService.getCalculations,
    refetchInterval: 30000,
    messages: {
      loading: "Refreshing calculations...",
      success: "Calculations refreshed",
      error: "Failed to refresh calculations",
    },
  });
}
