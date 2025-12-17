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
    <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Items Endpoints</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Item */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">POST /api/v1/items</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={itemForm.title}
              onChange={(e) =>
                setItemForm({ ...itemForm, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={itemForm.description}
              onChange={(e) =>
                setItemForm({ ...itemForm, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading === "createItem" ? "Creating..." : "Create Item"}
            </button>
          </div>
        </div>

        {/* Get Items */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">GET /api/v1/items</h3>
          <button
            onClick={() => onApiCall(api.getItems, setItems)}
            disabled={loading === "getItems"}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 mb-3"
          >
            {loading === "getItems" ? "Loading..." : "Get All Items"}
          </button>
          {items.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="p-2 bg-gray-100 rounded text-sm">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-gray-600">{item.description}</div>
                  <div className="text-xs text-gray-500">
                    Price: ${item.price} | ID: {item.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Get Item by ID */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">GET /api/v1/items/{`{id}`}</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Item ID"
              value={selectedItemId || ""}
              onChange={(e) =>
                setSelectedItemId(Number(e.target.value) || null)
              }
              className="w-full px-3 py-2 border rounded"
            />
            <button
              onClick={() =>
                selectedItemId &&
                onApiCall(() => api.getItem(selectedItemId), setSelectedItem)
              }
              disabled={loading === "getItem" || !selectedItemId}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {loading === "getItem" ? "Loading..." : "Get Item"}
            </button>
            {selectedItem && <JsonDisplay data={selectedItem} />}
          </div>
        </div>

        {/* Update Item */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">PUT /api/v1/items/{`{id}`}</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Item ID"
              value={selectedItemId || ""}
              onChange={(e) =>
                setSelectedItemId(Number(e.target.value) || null)
              }
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading === "updateItem" ? "Updating..." : "Update Item"}
            </button>
          </div>
        </div>

        {/* Delete Item */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">DELETE /api/v1/items/{`{id}`}</h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Item ID to delete"
              value={selectedItemId || ""}
              onChange={(e) =>
                setSelectedItemId(Number(e.target.value) || null)
              }
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading === "deleteItem" ? "Deleting..." : "Delete Item"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
