# Compiling the Engine Library

## Requirements

Before compiling, make sure you have installed:

- **CMake 3.10+** - [Download CMake](https://cmake.org/download/)
- **C++ Compiler**:
  - **Windows**: Visual Studio 2019+ or MinGW
  - **Linux**: GCC 7+ or Clang (`sudo apt-get install build-essential`)
  - **Mac**: Xcode Command Line Tools (`xcode-select --install`)

## Compilation

### Windows (Visual Studio / MinGW)

```bash
cd engine
mkdir build
cd build
cmake ..
cmake --build . --config Release
```

The library will be compiled as `engine.dll` in the `build/bin/Release/` folder.

### Linux

```bash
cd engine
mkdir build
cd build
cmake ..
make
```

The library will be compiled as `libengine.so` in the `build/` folder.

### Mac

```bash
cd engine
mkdir build
cd build
cmake ..
make
```

The library will be compiled as `libengine.dylib` in the `build/` folder.

## Using Build Scripts

The project includes ready-to-use build scripts:

### Windows

```bash
cd engine
.\build.bat
```

### Linux/Mac

```bash
cd engine
chmod +x build.sh
./build.sh
```

## CMake Configuration

### Build Options

You can pass additional options to CMake:

```bash
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake -DCMAKE_BUILD_TYPE=Debug ..
```

### Installation

To install the library system-wide:

```bash
cmake --build . --target install
```

## Troubleshooting

### Problem: CMake Cannot Find Compiler

**Solution**:

1. Check if the compiler is installed
2. Make sure the compiler is in PATH
3. For Visual Studio: run "Developer Command Prompt"

### Problem: Linking Errors

**Solution**:

1. Check if all dependencies are installed
2. Check compilation logs in the `build/` folder
3. Make sure you're using the correct compiler

### Problem: Library Not Found in Python

**Solution**:

1. Copy the library to the `server/` folder
2. Set the `LD_LIBRARY_PATH` environment variable (Linux) or `DYLD_LIBRARY_PATH` (Mac)
3. Check the file name (should match your operating system)

## Next Steps

After compiling the library:

- [Library Functions](functions.md) - Learn about available functions
- [API Reference](api.md) - Detailed API documentation
- [Server Integration](../server/index.md) - How to use the library in Python
