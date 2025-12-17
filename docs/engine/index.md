# Engine - C++ Library

## Overview

Engine is a C++ library containing functions for performing mathematical calculations and data processing. The library has been designed with high performance and easy integration with Python via ctypes in mind.

## Features

The library provides the following functions:

- **Mathematical operations**: addition, multiplication, factorial
- **Data processing**: string and array operations
- **Numerical operations**: array summation

## API Documentation

Detailed documentation for all functions is available in the generated HTML documentation (Doxygen).

### Generating Documentation

```bash
cd engine
mkdir build
cd build
cmake ..
cmake --build . --target docs --config Release
```

HTML documentation will be generated in the `docs/html/` folder. Open `docs/html/index.html` in your browser.

## Requirements

- **CMake**: 3.10+
- **C++ Compiler**:
  - Windows: Visual Studio 2019+ or MinGW
  - Linux: GCC 7+ or Clang
  - Mac: Xcode Command Line Tools
- **Doxygen**: (optional) for generating documentation

## Compilation

See [Compilation Instructions](compilation.md) for detailed instructions.

## Available Functions

See [Function List](functions.md) for a complete list of available functions.

## Python Integration

The library is used by the `app/engine_wrapper.py` module in the FastAPI server.

See [Server Documentation](../server/index.md) for integration details.


