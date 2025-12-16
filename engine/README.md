# Engine - C++ Library

Przykładowa biblioteka C++ do komunikacji z FastAPI.

## Kompilacja

### Windows (Visual Studio / MinGW)

```bash
mkdir build
cd build
cmake ..
cmake --build . --config Release
```

Biblioteka zostanie skompilowana jako `engine.dll` w folderze `build/bin/Release/`.

### Linux/Mac

```bash
mkdir build
cd build
cmake ..
make
```

Biblioteka zostanie skompilowana jako `libengine.so` (Linux) lub `libengine.dylib` (Mac).

## Funkcje

- `add(int a, int b)` - Dodaje dwie liczby
- `multiply(int a, int b)` - Mnoży dwie liczby
- `factorial(int n)` - Oblicza silnię
- `process_string(const char* input, char* output, int size)` - Przetwarza string (konwertuje na wielkie litery)
- `sum_array(double* array, int size)` - Sumuje elementy tablicy

## Użycie z Python

Biblioteka jest używana przez moduł `app/engine_wrapper.py` w FastAPI.
