import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ModelSLab Client
            </h1>
            <p className="text-gray-600 mb-8">
              React + TypeScript + Vite + Tailwind CSS
            </p>

            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setCount(count - 1)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                -
              </button>
              <div className="text-3xl font-bold text-gray-800 min-w-[80px] text-center">
                {count}
              </div>
              <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="font-semibold text-blue-800 mb-2">React</h2>
                <p className="text-sm text-blue-600">Biblioteka UI</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h2 className="font-semibold text-purple-800 mb-2">
                  TypeScript
                </h2>
                <p className="text-sm text-purple-600">Typowanie statyczne</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h2 className="font-semibold text-green-800 mb-2">Vite</h2>
                <p className="text-sm text-green-600">Szybki bundler</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
