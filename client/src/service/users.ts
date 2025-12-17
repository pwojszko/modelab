import type { User, UserCreate } from "../types";
import { API_BASE_URL } from "./config";

// Users endpoints
export async function getUsers(skip = 0, limit = 100): Promise<User[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/users?skip=${skip}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}

export async function createUser(user: UserCreate): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create user");
  }
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
}
