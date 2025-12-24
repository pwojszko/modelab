import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import type { UserCreate } from "../api";
import { JsonDisplay } from "./common/JsonDisplay";
import {
  useUsers,
  useUser,
  useCreateUser,
  useDeleteUser,
} from "../hooks/useUsers";

export function UsersEndpoints() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Queries
  const usersQuery = useUsers();
  const userQuery = useUser(selectedUserId || 0, !!selectedUserId);

  // Mutations
  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();

  // Forms
  const createForm = useForm({
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
    } as UserCreate,
    onSubmit: async ({ value }) => {
      createMutation.mutate(value, {
        onSuccess: () => {
          createForm.reset();
        },
      });
    },
  });

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <span className="text-2xl">👥</span>
        Users Endpoints
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create User */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">POST</span>
            <span className="text-gray-400 text-sm">/api/v1/users</span>
          </h3>
          <div className="space-y-3">
            <createForm.Field name="email">
              {(field) => (
                <input
                  type="email"
                  placeholder="Email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </createForm.Field>
            <createForm.Field name="full_name">
              {(field) => (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </createForm.Field>
            <createForm.Field name="password">
              {(field) => (
                <input
                  type="password"
                  placeholder="Password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
              )}
            </createForm.Field>
            <createForm.Subscribe>
              {({ canSubmit }) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    createForm.handleSubmit();
                  }}
                  disabled={!canSubmit || createMutation.isPending}
                  className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {createMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Creating...
                    </span>
                  ) : (
                    "Create User"
                  )}
                </button>
              )}
            </createForm.Subscribe>
            {createMutation.isError && (
              <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                <div className="text-sm font-medium text-red-300">
                  Error: {createMutation.error?.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Get Users */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400 text-sm">/api/v1/users</span>
          </h3>
          <button
            onClick={() => usersQuery.refetch()}
            disabled={usersQuery.isFetching}
            className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-4"
          >
            {usersQuery.isFetching ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              "Get All Users"
            )}
          </button>
          {usersQuery.data && usersQuery.data.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {usersQuery.data.map((user) => (
                <div
                  key={user.id}
                  className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-semibold text-gray-100">
                    {user.full_name}
                  </div>
                  <div className="text-gray-300 text-sm">{user.email}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    ID: {user.id}
                  </div>
                </div>
              ))}
            </div>
          )}
          {usersQuery.isError && (
            <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
              <div className="text-sm font-medium text-red-300">
                Error: {usersQuery.error?.message}
              </div>
            </div>
          )}
        </div>

        {/* Get User by ID */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-purple-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400 text-sm">
              /api/v1/users/{`{id}`}
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="User ID"
              value={selectedUserId || ""}
              onChange={(e) =>
                setSelectedUserId(Number(e.target.value) || null)
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() => userQuery.refetch()}
              disabled={userQuery.isFetching || !selectedUserId}
              className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {userQuery.isFetching ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Loading...
                </span>
              ) : (
                "Get User"
              )}
            </button>
            {userQuery.data && <JsonDisplay data={userQuery.data} />}
            {userQuery.isError && (
              <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                <div className="text-sm font-medium text-red-300">
                  Error: {userQuery.error?.message}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete User */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-red-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-red-400 font-mono text-sm">DELETE</span>
            <span className="text-gray-400 text-sm">
              /api/v1/users/{`{id}`}
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="User ID to delete"
              value={selectedUserId || ""}
              onChange={(e) =>
                setSelectedUserId(Number(e.target.value) || null)
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() => {
                if (selectedUserId) {
                  deleteMutation.mutate(selectedUserId, {
                    onSuccess: () => {
                      setSelectedUserId(null);
                    },
                  });
                }
              }}
              disabled={deleteMutation.isPending || !selectedUserId}
              className="w-full px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {deleteMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Deleting...
                </span>
              ) : (
                "Delete User"
              )}
            </button>
            {deleteMutation.isError && (
              <div className="p-3 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border border-red-600">
                <div className="text-sm font-medium text-red-300">
                  Error: {deleteMutation.error?.message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
