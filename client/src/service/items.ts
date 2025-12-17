import type { Item, ItemCreate, ItemUpdate } from "../types";
import { API_BASE_URL } from "./config";

// Items endpoints
export async function getItems(skip = 0, limit = 100): Promise<Item[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/items?skip=${skip}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
}

export async function getItem(id: number): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/api/v1/items/${id}`);
  if (!response.ok) throw new Error("Failed to fetch item");
  return response.json();
}

export async function createItem(item: ItemCreate): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/api/v1/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create item");
  }
  return response.json();
}

export async function updateItem(id: number, item: ItemUpdate): Promise<Item> {
  const response = await fetch(`${API_BASE_URL}/api/v1/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to update item");
  }
  return response.json();
}

export async function deleteItem(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete item");
}

