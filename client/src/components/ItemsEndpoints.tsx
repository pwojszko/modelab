import { useState } from "react";
import * as api from "../api";
import type { Item, ItemCreate, ItemUpdate } from "../api";
import { JsonDisplay } from "./common/JsonDisplay";

interface ItemsEndpointsProps {
  loading: string | null;
  onApiCall: (
    call: () => Promise<any>,
    setState?: (data: any) => void,
    key?: string
  ) => Promise<void>;
}

export function ItemsEndpoints({ loading, onApiCall }: ItemsEndpointsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [itemForm, setItemForm] = useState<ItemCreate>({
    title: "",
    description: "",
    price: 0,
  });
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemUpdateForm, setItemUpdateForm] = useState<ItemUpdate>({
    title: "",
    description: "",
    price: 0,
  });

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <span className="text-2xl">📦</span>
        Items Endpoints
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Item */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">POST</span>
            <span className="text-gray-400 text-sm">/api/v1/items</span>
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={itemForm.title}
              onChange={(e) =>
                setItemForm({ ...itemForm, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Description"
              value={itemForm.description}
              onChange={(e) =>
                setItemForm({ ...itemForm, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="number"
              placeholder="Price"
              value={itemForm.price}
              onChange={(e) =>
                setItemForm({
                  ...itemForm,
                  price: Number(e.target.value),
                })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                onApiCall(
                  () => api.createItem(itemForm),
                  (item) => {
                    setItems([...items, item]);
                    setItemForm({ title: "", description: "", price: 0 });
                  }
                )
              }
              disabled={loading === "createItem"}
              className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "createItem" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Creating...
                </span>
              ) : (
                "Create Item"
              )}
            </button>
          </div>
        </div>

        {/* Get Items */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-green-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400 text-sm">/api/v1/items</span>
          </h3>
          <button
            onClick={() => onApiCall(api.getItems, setItems)}
            disabled={loading === "getItems"}
            className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-4"
          >
            {loading === "getItems" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Loading...
              </span>
            ) : (
              "Get All Items"
            )}
          </button>
          {items.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-semibold text-gray-100">
                    {item.title}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {item.description}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Price: ${item.price} | ID: {item.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Get Item by ID */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-purple-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-green-400 font-mono text-sm">GET</span>
            <span className="text-gray-400 text-sm">
              /api/v1/items/{`{id}`}
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Item ID"
              value={selectedItemId || ""}
              onChange={(e) =>
                setSelectedItemId(Number(e.target.value) || null)
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                selectedItemId &&
                onApiCall(() => api.getItem(selectedItemId), setSelectedItem)
              }
              disabled={loading === "getItem" || !selectedItemId}
              className="w-full px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "getItem" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Loading...
                </span>
              ) : (
                "Get Item"
              )}
            </button>
            {selectedItem && <JsonDisplay data={selectedItem} />}
          </div>
        </div>

        {/* Update Item */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-yellow-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-orange-400 font-mono text-sm">PUT</span>
            <span className="text-gray-400 text-sm">
              /api/v1/items/{`{id}`}
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Item ID"
              value={selectedItemId || ""}
              onChange={(e) =>
                setSelectedItemId(Number(e.target.value) || null)
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Title (optional)"
              value={itemUpdateForm.title || ""}
              onChange={(e) =>
                setItemUpdateForm({
                  ...itemUpdateForm,
                  title: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={itemUpdateForm.description || ""}
              onChange={(e) =>
                setItemUpdateForm({
                  ...itemUpdateForm,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <input
              type="number"
              placeholder="Price (optional)"
              value={itemUpdateForm.price || ""}
              onChange={(e) =>
                setItemUpdateForm({
                  ...itemUpdateForm,
                  price: Number(e.target.value) || undefined,
                })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                selectedItemId &&
                onApiCall(
                  () => api.updateItem(selectedItemId, itemUpdateForm),
                  (updated) => {
                    setItems(
                      items.map((i) => (i.id === selectedItemId ? updated : i))
                    );
                    setItemUpdateForm({
                      title: "",
                      description: "",
                      price: 0,
                    });
                  }
                )
              }
              disabled={loading === "updateItem" || !selectedItemId}
              className="w-full px-5 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "updateItem" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Updating...
                </span>
              ) : (
                "Update Item"
              )}
            </button>
          </div>
        </div>

        {/* Delete Item */}
        <div className="border-2 border-gray-700 rounded-xl p-5 hover:border-red-500 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-gray-800 to-gray-900">
          <h3 className="font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <span className="text-red-400 font-mono text-sm">DELETE</span>
            <span className="text-gray-400 text-sm">
              /api/v1/items/{`{id}`}
            </span>
          </h3>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Item ID to delete"
              value={selectedItemId || ""}
              onChange={(e) =>
                setSelectedItemId(Number(e.target.value) || null)
              }
              className="w-full px-4 py-2.5 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400"
            />
            <button
              onClick={() =>
                selectedItemId &&
                onApiCall(
                  () => api.deleteItem(selectedItemId),
                  () => {
                    setItems(items.filter((i) => i.id !== selectedItemId));
                    setSelectedItemId(null);
                  }
                )
              }
              disabled={loading === "deleteItem" || !selectedItemId}
              className="w-full px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading === "deleteItem" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Deleting...
                </span>
              ) : (
                "Delete Item"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
