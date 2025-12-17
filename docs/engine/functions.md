# Engine Library Functions

The Engine library provides the following functions for mathematical calculations and data processing.

## Mathematical Operations

### `add(int a, int b)`

Adds two integers.

**Parameters**:

- `a` (int): First number
- `b` (int): Second number

**Returns**: `int` - Sum of a + b

**Example**:

```cpp
int result = add(5, 3);  // result = 8
```

### `multiply(int a, int b)`

Multiplies two integers.

**Parameters**:

- `a` (int): First number
- `b` (int): Second number

**Returns**: `int` - Product of a \* b

**Example**:

```cpp
int result = multiply(4, 7);  // result = 28
```

### `factorial(int n)`

Calculates the factorial of an integer.

**Parameters**:

- `n` (int): Number for which factorial is calculated

**Returns**: `long long` - Factorial of n!

**Example**:

```cpp
long long result = factorial(5);  // result = 120
```

**Note**: The function may return an error for very large values of n due to overflow.

## Data Processing

### `process_string(const char* input, char* output, int size)`

Processes a string by converting all letters to uppercase.

**Parameters**:

- `input` (const char\*): Input string
- `output` (char\*): Output buffer for the result
- `size` (int): Size of the output buffer

**Returns**: `void`

**Example**:

```cpp
const char* input = "Hello World";
char output[256];
process_string(input, output, 256);
// output = "HELLO WORLD"
```

**Note**: Make sure the output buffer is large enough.

### `sum_array(double* array, int size)`

Sums elements of a floating-point array.

**Parameters**:

- `array` (double\*): Pointer to array
- `size` (int): Number of elements in the array

**Returns**: `double` - Sum of all elements

**Example**:

```cpp
double arr[] = {1.5, 2.5, 3.5, 4.5};
double result = sum_array(arr, 4);  // result = 12.0
```

## Usage in Python

All functions are available through the Python wrapper in `server/app/engine_wrapper.py`.

### Example Usage via API

```bash
curl -X POST "http://localhost:8000/api/v1/engine/add" \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3}'
```

### Example Direct Usage in Python

```python
from app.engine_wrapper import EngineWrapper

engine = EngineWrapper()
result = engine.add(5, 3)  # result = 8
```

## Detailed Documentation

Full API documentation with examples and implementation details is available in the generated HTML documentation (Doxygen).

To generate the documentation:

```bash
cd engine
mkdir build
cd build
cmake ..
cmake --build . --target docs --config Release
```

Then open `docs/html/index.html` in your browser.

## Next Steps

- [API Reference](api.md) - Detailed API documentation
- [Compilation](compilation.md) - How to compile the library
- [Server Integration](../server/index.md) - How to use in Python

