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
    <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Users Endpoints</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create User */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">POST /api/v1/users</h3>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={userForm.full_name}
              onChange={(e) =>
                setUserForm({ ...userForm, full_name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading === "createUser" ? "Creating..." : "Create User"}
            </button>
          </div>
        </div>

        {/* Get Users */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">GET /api/v1/users</h3>
          <button
            onClick={() => onApiCall(api.getUsers, setUsers)}
            disabled={loading === "getUsers"}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 mb-3"
          >
            {loading === "getUsers" ? "Loading..." : "Get All Users"}
          </button>
          {users.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="p-2 bg-gray-100 rounded text-sm">
                  <div className="font-semibold">{user.full_name}</div>
                  <div className="text-gray-600">{user.email}</div>
                  <div className="text-xs text-gray-500">ID: {user.id}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Get User by ID */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">GET /api/v1/users/{`{id}`}</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="User ID"
              value={selectedUserId || ""}
              onChange={(e) =>
                setSelectedUserId(Number(e.target.value) || null)
              }
              className="w-full px-3 py-2 border rounded"
            />
            <button
              onClick={() =>
                selectedUserId &&
                onApiCall(() => api.getUser(selectedUserId), setSelectedUser)
              }
              disabled={loading === "getUser" || !selectedUserId}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {loading === "getUser" ? "Loading..." : "Get User"}
            </button>
            {selectedUser && <JsonDisplay data={selectedUser} />}
          </div>
        </div>

        {/* Delete User */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">DELETE /api/v1/users/{`{id}`}</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="User ID to delete"
              value={selectedUserId || ""}
              onChange={(e) =>
                setSelectedUserId(Number(e.target.value) || null)
              }
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading === "deleteUser" ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
