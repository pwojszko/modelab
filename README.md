# ModelSLab

Full-stack project consisting of a C++ library and FastAPI server for performing calculations and data operations.

## Overview

ModelSLab is an application consisting of three main components:

- **Engine** - C++ library containing functions for mathematical calculations and data processing
- **Server** - FastAPI backend providing REST API with C++ library integration
- **Client** - Folder for future client application (frontend)

## Quick Start

### Requirements

- **Python 3.8+** - for FastAPI server
- **CMake 3.10+** - for C++ library compilation
- **C++ Compiler**:
  - Windows: Visual Studio 2019+ or MinGW
  - Linux: GCC 7+ or Clang
  - Mac: Xcode Command Line Tools

### Installation

1. **Compile C++ Library**:

   ```bash
   cd engine
   mkdir build && cd build
   cmake ..
   cmake --build . --config Release
   ```

2. **Setup Python Server**:

   ```bash
   cd server
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   pip install -r requirements.txt
   ```

3. **Run Server**:
   ```bash
   uvicorn main:app --reload
   ```

Server will be available at: `http://localhost:8000`

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Documentation

📚 **Full documentation is available in MkDocs**:

- **Local**: Run `docs/serve_docs.bat` / `docs/serve_docs.sh` (or `mkdocs serve --config-file docs/mkdocs.yml --dev-addr 127.0.0.1:8001` from docs folder)
- **Online**: See [Documentation](docs/README.md) for details

The documentation includes:

- Project overview and architecture
- Detailed installation instructions
- Complete API reference
- Usage examples
- Development guidelines

## Project Structure

```
modelslab/
├── engine/              # C++ Library
├── server/              # FastAPI Backend
├── client/              # Future frontend
└── docs/                # MkDocs Documentation
    ├── mkdocs.yml       # MkDocs Configuration
    └── ...              # Documentation files
```

## Technologies

- **C++** - Computational library
- **CMake** - Build system
- **Python 3.8+** - Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## Links

- [Full Documentation](docs/README.md)
- [Engine Documentation](engine/README.md)
- [Server Documentation](server/README.md)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [CMake Documentation](https://cmake.org/documentation/)

## License

This project is part of a larger application.


