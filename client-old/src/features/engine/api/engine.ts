import type {
  EngineResponse,
  AddRequest,
  MultiplyRequest,
  FactorialRequest,
  ProcessStringRequest,
  SumArrayRequest,
  EngineCalculationResponse,
} from "../types/engineTypes";
import { API_BASE_URL } from "../../../config/apiConfig";

export async function getEngineStatus(): Promise<EngineResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/status`);
  if (!response.ok) throw new Error("Failed to get engine status");
  return response.json();
}

export async function addNumbers(request: AddRequest): Promise<EngineResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.detail[0].msg || "Failed to add numbers");
  }
  return response.json();
}

export async function multiplyNumbers(
  request: MultiplyRequest
): Promise<EngineResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/multiply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail[0].msg || "Failed to multiply numbers");
  }
  return response.json();
}

export async function calculateFactorial(
  request: FactorialRequest
): Promise<EngineResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/factorial`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail[0].msg || "Failed to calculate factorial");
  }
  return response.json();
}

export async function processString(
  request: ProcessStringRequest
): Promise<EngineResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/process-string`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail[0].msg || "Failed to process string");
  }
  return response.json();
}

export async function sumArray(
  request: SumArrayRequest
): Promise<EngineResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/sum-array`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail[0].msg || "Failed to sum array");
  }
  return response.json();
}

export async function getCalculations(): Promise<EngineCalculationResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/calculations`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail[0].msg || "Failed to get calculations");
  }
  return response.json();
}
