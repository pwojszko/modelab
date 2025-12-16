# Quick Start

This guide will walk you through the installation and setup process for ModelSLab step by step.

## Prerequisites

Before starting, make sure you have installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **CMake 3.10+** - [Download CMake](https://cmake.org/download/)
- **C++ Compiler**:
  - **Windows**: Visual Studio 2019+ or MinGW
  - **Linux**: `sudo apt-get install build-essential` (Ubuntu/Debian)
  - **Mac**: Xcode Command Line Tools (`xcode-select --install`)

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/modelslab.git
cd modelslab
```

## Step 2: Compile C++ Library

### Windows

```bash
cd engine
mkdir build
cd build
cmake ..
cmake --build . --config Release
```

The library will be compiled as `engine.dll` in the `build/bin/Release/` folder.

### Linux/Mac

```bash
cd engine
mkdir build
cd build
cmake ..
make
```

The library will be compiled as:

- `libengine.so` (Linux)
- `libengine.dylib` (Mac)

## Step 3: Python Environment Setup

### Create Virtual Environment

```bash
cd server
python -m venv venv
```

### Activate Virtual Environment

**Windows**:

```bash
venv\Scripts\activate
```

**Linux/Mac**:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 4: Configure Library Path

Make sure the compiled C++ library is available to the server.

**Windows**:

```bash
# Copy engine.dll to server folder
copy ..\engine\build\bin\Release\engine.dll .
```

**Linux/Mac**:

```bash
# Copy library to server folder
cp ../engine/build/libengine.so .  # Linux
# or
cp ../engine/build/libengine.dylib .  # Mac
```

Alternatively, you can set the `LD_LIBRARY_PATH` environment variable (Linux) or `DYLD_LIBRARY_PATH` (Mac).

## Step 5: Run the Server

```bash
cd server
uvicorn main:app --reload
```

The server should start at: `http://localhost:8000`

## Step 6: Verify Installation

### Check Server Status

Open in browser:

- **Home page**: http://localhost:8000
- **Health check**: http://localhost:8000/health

### Check C++ Library Status

```bash
curl http://localhost:8000/api/v1/engine/status
```

Expected response:

```json
{
  "status": "available",
  "message": "C++ engine library is loaded and ready"
}
```

### Test the API

```bash
curl -X POST "http://localhost:8000/api/v1/engine/add" \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3}'
```

Expected response:

```json
{
  "result": 8
}
```

## Access Documentation

After starting the server, API documentation is available at:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Troubleshooting

### Problem: C++ Library Not Found

**Symptoms**:

```json
{
  "status": "unavailable",
  "message": "C++ engine library not found"
}
```

**Solution**:

1. Check if the library was compiled
2. Make sure the library is in the `server/` folder
3. Check the file name (should match your operating system)

### Problem: C++ Compilation Errors

**Solution**:

1. Check if you have a C++ compiler installed
2. Check CMake version: `cmake --version`
3. Check compilation logs in the `build/` folder

### Problem: Python Import Errors

**Solution**:

1. Make sure the virtual environment is active
2. Check installation: `pip list`
3. Reinstall: `pip install -r requirements.txt`

## Next Steps

Now that you have a working system:

- [Learn about the API](../server/api.md) - Learn about all endpoints
- [Usage Examples](../examples.md) - See more examples
- [Engine Documentation](../engine/index.md) - Learn about C++ functions
- [Configuration](../server/configuration.md) - Customize settings

## Support

If you encounter problems:

1. Check the [documentation](../index.md)
2. Review [GitHub issues](https://github.com/your-username/modelslab/issues)
3. Create a new issue with a description of the problem
