import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as usersService from "../service/users";
import type { User, UserCreate } from "../types";

// Query keys
export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (filters?: { skip?: number; limit?: number }) =>
    [...usersKeys.lists(), filters] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: number) => [...usersKeys.details(), id] as const,
};

// Get all users
export function useUsers(skip = 0, limit = 100) {
  return useQuery<User[]>({
    queryKey: usersKeys.list({ skip, limit }),
    queryFn: () => usersService.getUsers(skip, limit),
  });
}

// Get user by ID
export function useUser(id: number, enabled = true) {
  return useQuery<User>({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.getUser(id),
    enabled: enabled && !!id,
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, UserCreate>({
    mutationFn: usersService.createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: usersService.deleteUser,
    onSuccess: (_, id) => {
      // Remove the user from cache
      queryClient.removeQueries({ queryKey: usersKeys.detail(id) });
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
