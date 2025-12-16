# Engine - C++ Library

Example C++ library for communication with FastAPI.

## Compilation

### Windows (Visual Studio / MinGW)

```bash
mkdir build
cd build
cmake ..
cmake --build . --config Release
```

The library will be compiled as `engine.dll` in the `build/bin/Release/` folder.

### Linux/Mac

```bash
mkdir build
cd build
cmake ..
make
```

The library will be compiled as `libengine.so` (Linux) or `libengine.dylib` (Mac).

## 📚 Documentation

The library has automatically generated HTML documentation (similar to Swagger in the `server` folder).

### Generating Documentation

#### Requirements

Install Doxygen:

- **Windows**: Download from [doxygen.nl](https://www.doxygen.nl/download.html) or use `choco install doxygen`
- **Linux**: `sudo apt-get install doxygen` (Ubuntu/Debian) or `sudo yum install doxygen` (RHEL/CentOS)
- **Mac**: `brew install doxygen`

#### Generating via CMake

After configuring the CMake project, you can generate documentation:

```bash
# Windows
cmake --build . --target docs --config Release

# Linux/Mac
make docs
```

HTML documentation will be generated in the `docs/html/` folder.

#### Opening Documentation

After generation, open the `docs/html/index.html` file in your browser.

#### Generating Directly with Doxygen

Alternatively, you can use Doxygen directly:

```bash
doxygen Doxyfile
```

Documentation will be generated in the `docs/html/` folder.

### Accessing Documentation

After generating documentation:

- Open `docs/html/index.html` in your browser
- Documentation contains full descriptions of all functions, parameters, and usage examples
- Interface is similar to Swagger UI - you can browse functions, their parameters, and examples

## Functions

- `add(int a, int b)` - Adds two numbers
- `multiply(int a, int b)` - Multiplies two numbers
- `factorial(int n)` - Calculates factorial
- `process_string(const char* input, char* output, int size)` - Processes string (converts to uppercase)
- `sum_array(double* array, int size)` - Sums array elements

Detailed documentation for all functions is available in the generated HTML documentation.

## Usage with Python

The library is used by the `app/engine_wrapper.py` module in FastAPI.
