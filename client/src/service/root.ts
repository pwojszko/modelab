import { API_BASE_URL } from "./config";

// Root endpoints
export async function getRoot() {
  const response = await fetch(`${API_BASE_URL}/`);
  return response.json();
}

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}

