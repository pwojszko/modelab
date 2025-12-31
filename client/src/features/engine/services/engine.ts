"use server";

import { revalidateTag } from "next/cache";
import type {
  Engine,
  AddRequest,
  MultiplyRequest,
  FactorialRequest,
  ProcessStringRequest,
  SumArrayRequest,
  EngineCalculationResponse,
} from "../types/engineTypes";
import type { ServiceResponse } from "@/types/service";

const API_BASE_URL = "http://localhost:8000";

export async function revalidateEngineStatus(): Promise<void> {
  revalidateTag("engine-status", "max");
}

export async function getEngineStatus(): Promise<ServiceResponse<Engine>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/status`, {
    next: {
      tags: ["engine-status"],
    },
  });

  if (!response.ok) {
    return {
      data: null,
      success: false,
      message: "Failed to get engine status",
    };
  }

  const data: Engine = await response.json();

  return {
    data: {
      ...data,
      timestamp: new Date(),
    },
    success: response.ok,
    message: response.statusText,
  };
}

export async function addNumbers(
  request: AddRequest
): Promise<ServiceResponse<Engine>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    return {
      data: null,
      success: false,
      message: error.detail[0].msg || "Failed to add numbers",
    };
  }

  revalidateEngineStatus();

  return {
    data: await response.json(),
    success: response.ok,
    message: response.statusText,
  };
}

export async function multiplyNumbers(
  request: MultiplyRequest
): Promise<ServiceResponse<Engine>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/multiply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    return {
      data: null,
      success: false,
      message: error.detail[0].msg || "Failed to multiply numbers",
    };
  }

  revalidateEngineStatus();

  return {
    data: await response.json(),
    success: response.ok,
    message: response.statusText,
  };
}

export async function calculateFactorial(
  request: FactorialRequest
): Promise<ServiceResponse<Engine>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/factorial`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    return {
      data: null,
      success: false,
      message: error.detail[0].msg || "Failed to calculate factorial",
    };
  }

  revalidateEngineStatus();

  return {
    data: await response.json(),
    success: response.ok,
    message: response.statusText,
  };
}

export async function processString(
  request: ProcessStringRequest
): Promise<ServiceResponse<Engine>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/process-string`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    return {
      data: null,
      success: false,
      message: error.detail[0].msg || "Failed to process string",
    };
  }

  revalidateEngineStatus();

  return {
    data: await response.json(),
    success: response.ok,
    message: response.statusText,
  };
}

export async function sumArray(
  request: SumArrayRequest
): Promise<ServiceResponse<Engine>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/sum-array`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json();
    return {
      data: null,
      success: false,
      message: error.detail[0].msg || "Failed to sum array",
    };
  }

  revalidateEngineStatus();

  return {
    data: await response.json(),
    success: response.ok,
    message: response.statusText,
  };
}

export async function getCalculations(): Promise<
  ServiceResponse<EngineCalculationResponse[]>
> {
  const response = await fetch(`${API_BASE_URL}/api/v1/engine/calculations`);

  if (!response.ok) {
    const error = await response.json();
    return {
      data: null,
      success: false,
      message: error.detail[0].msg || "Failed to get calculations",
    };
  }

  return {
    data: await response.json(),
    success: response.ok,
    message: response.statusText,
  };
}
