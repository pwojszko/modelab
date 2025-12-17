import { useState } from "react";
import * as api from "../api";
import type { User, UserCreate } from "../api";
import { JsonDisplay } from "./common/JsonDisplay";

interface UsersEndpointsProps {
  loading: string | null;
  onApiCall: (
    call: () => Promise<any>,
    setState?: (data: any) => void,
    key?: string
  ) => Promise<void>;
}

export function UsersEndpoints({ loading, onApiCall }: UsersEndpointsProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [userForm, setUserForm] = useState<UserCreate>({
    email: "",
    full_name: "",
    password: "",
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={userForm.full_name}
              onChange={(e) =>
                setUserForm({ ...userForm, full_name: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                onApiCall(
                  () => api.createUser(userForm),
                  (user) => {
                    setUsers([...users, user]);
                    setUserForm({
                      email: "",
                      full_name: "",
                      password: "",
                    });
                  }
                )
              }
              disabled={loading === "createUser"}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "createUser" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Creating...
                </span>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </div>

        {/* Get Users */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400 text-sm">/api/v1/users</span>
          </h3>
          <button
            onClick={() => onApiCall(api.getUsers, setUsers)}
            disabled={loading === "getUsers"}
            className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-4"
          >
            {loading === "getUsers" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              "Get All Users"
            )}
          </button>
          {users.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {users.map((user) => (
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
              onClick={() =>
                selectedUserId &&
                onApiCall(() => api.getUser(selectedUserId), setSelectedUser)
              }
              disabled={loading === "getUser" || !selectedUserId}
              className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "getUser" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Loading...
                </span>
              ) : (
                "Get User"
              )}
            </button>
            {selectedUser && <JsonDisplay data={selectedUser} />}
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
              onClick={() =>
                selectedUserId &&
                onApiCall(
                  () => api.deleteUser(selectedUserId),
                  () => {
                    setUsers(users.filter((u) => u.id !== selectedUserId));
                    setSelectedUserId(null);
                  }
                )
              }
              disabled={loading === "deleteUser" || !selectedUserId}
              className="w-full px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "deleteUser" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Deleting...
                </span>
              ) : (
                "Delete User"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
