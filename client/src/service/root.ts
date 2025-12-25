import { API_BASE_URL } from "./config";
import type { RootResponse, HealthResponse } from "../types";

// Root endpoints
export async function getRoot(): Promise<RootResponse> {
  const response = await fetch(`${API_BASE_URL}/`);
  return response.json();
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}
