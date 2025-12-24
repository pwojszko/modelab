import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as itemsService from "../service/items";
import type { Item, ItemCreate, ItemUpdate } from "../types";

// Query keys
export const itemsKeys = {
  all: ["items"] as const,
  lists: () => [...itemsKeys.all, "list"] as const,
  list: (filters?: { skip?: number; limit?: number }) =>
    [...itemsKeys.lists(), filters] as const,
  details: () => [...itemsKeys.all, "detail"] as const,
  detail: (id: number) => [...itemsKeys.details(), id] as const,
};

// Get all items
export function useItems(skip = 0, limit = 100) {
  return useQuery<Item[]>({
    queryKey: itemsKeys.list({ skip, limit }),
    queryFn: () => itemsService.getItems(skip, limit),
  });
}

// Get item by ID
export function useItem(id: number, enabled = true) {
  return useQuery<Item>({
    queryKey: itemsKeys.detail(id),
    queryFn: () => itemsService.getItem(id),
    enabled: enabled && !!id,
  });
}

// Create item mutation
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, ItemCreate>({
    mutationFn: itemsService.createItem,
    onSuccess: () => {
      // Invalidate and refetch items list
      queryClient.invalidateQueries({ queryKey: itemsKeys.lists() });
    },
  });
}

// Update item mutation
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, { id: number; data: ItemUpdate }>({
    mutationFn: ({ id, data }) => itemsService.updateItem(id, data),
    onSuccess: (data) => {
      // Update the specific item in cache
      queryClient.setQueryData(itemsKeys.detail(data.id), data);
      // Invalidate items list
      queryClient.invalidateQueries({ queryKey: itemsKeys.lists() });
    },
  });
}

// Delete item mutation
export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: itemsService.deleteItem,
    onSuccess: (_, id) => {
      // Remove the item from cache
      queryClient.removeQueries({ queryKey: itemsKeys.detail(id) });
      // Invalidate items list
      queryClient.invalidateQueries({ queryKey: itemsKeys.lists() });
    },
  });
}
