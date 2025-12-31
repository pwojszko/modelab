"use server";

const API_BASE_URL = "http://localhost:8000";
import { ServiceResponse } from "@/types/service";
import type { RootResponse, Health } from "../types/rootTypes";

export async function getRoot(): Promise<RootResponse> {
  const response = await fetch(`${API_BASE_URL}/`);
  return response.json();
}

export async function getHealth(): Promise<ServiceResponse<Health>> {
  const response = await fetch(`${API_BASE_URL}/health`);
  const data = await response.json();

  return {
    success: response.ok,
    message: response.statusText,
    data: {
      status: data.status,
      timestamp: new Date(),
    },
  };
}
