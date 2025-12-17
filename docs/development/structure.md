# Project Structure

Detailed description of the ModelSLab project structure.

## Structure Overview

```
modelslab/
├── engine/              # C++ Library
├── server/              # FastAPI Backend
├── client/              # Folder for future frontend
├── docs/                # MkDocs Documentation
├── mkdocs.yml           # MkDocs Configuration
└── README.md            # Main README
```

## Engine (C++)

```
engine/
├── engine.h             # Library header (interface)
├── engine.cpp           # Function implementation
├── CMakeLists.txt       # CMake configuration
├── Doxyfile             # Doxygen configuration
├── build.bat            # Build script (Windows)
├── build.sh             # Build script (Linux/Mac)
├── hot_reload.py        # Hot reload script (optional)
├── hot_reload.bat       # Hot reload script Windows
├── README.md            # Library documentation
├── build/               # Build folder (generated)
│   └── bin/             # Compiled libraries
└── docs/                # HTML documentation (generated)
    └── html/
```

### Source Files

- **engine.h**: Function definitions, exported API
- **engine.cpp**: Implementation of all functions

### Configuration Files

- **CMakeLists.txt**: Build system configuration
- **Doxyfile**: Documentation generation configuration

### Scripts

- **build.bat/build.sh**: Build automation
- **hot_reload.py/bat**: Automatic library reloading during development

## Server (FastAPI)

```
server/
├── main.py              # Application entry point
├── requirements.txt     # Python dependencies
├── README.md            # Server documentation
├── .env                 # Environment variables (optional)
├── venv/                # Virtual environment (generated)
└── app/
    ├── __init__.py
    ├── core/
    │   ├── __init__.py
    │   └── config.py    # Application configuration
    ├── models/
    │   ├── __init__.py
    │   └── schemas.py   # Pydantic models
    ├── routers/
    │   ├── __init__.py
    │   ├── users.py     # User endpoints
    │   ├── items.py     # Item endpoints
    │   └── engine.py    # C++ integration endpoints
    └── engine_wrapper.py # Python wrapper for C++ library
```

### Application Structure

- **main.py**: Creates FastAPI instance, registers routers
- **app/core/**: Configuration and settings
- **app/models/**: Data schemas (Pydantic)
- **app/routers/**: API endpoints divided into modules
- **app/engine_wrapper.py**: C++ library integration

## Client (Future)

```
client/
└── .gitkeep            # Placeholder
```

Folder prepared for future frontend implementation.

## Documentation

```
docs/
├── requirements.txt     # MkDocs dependencies
├── index.md            # Documentation home page
├── introduction/
│   ├── overview.md     # Project overview
│   ├── architecture.md # System architecture
│   └── quickstart.md   # Quick start
├── engine/
│   ├── index.md        # Engine overview
│   ├── compilation.md  # Compilation
│   ├── functions.md    # Function list
│   └── api.md          # API Reference
├── server/
│   ├── index.md        # Server overview
│   ├── installation.md # Installation
│   ├── api.md          # API Endpoints
│   └── configuration.md # Configuration
├── examples.md         # Usage examples
└── development/
    ├── structure.md    # This file
    └── contributing.md # Contributing
```

## Main Configuration Files

### mkdocs.yml

MkDocs documentation configuration:

- Material theme
- Navigation structure
- Markdown extensions
- Language settings

### .gitignore

Ignored files and folders:

- `__pycache__/`, `*.pyc` - Python cache
- `venv/`, `env/` - Virtual environments
- `build/` - Build folders
- `.env` - Environment variables
- `.vscode/`, `.idea/` - IDE configurations

## Dependencies Between Components

```
Client (future)
    │
    │ HTTP/REST
    ▼
Server (FastAPI)
    │
    │ ctypes/FFI
    ▼
Engine (C++)
```

## Naming Conventions

### C++

- Functions: `snake_case` (e.g., `add`, `process_string`)
- Files: `lowercase` (e.g., `engine.h`, `engine.cpp`)

### Python

- Modules: `snake_case` (e.g., `engine_wrapper.py`)
- Classes: `PascalCase` (e.g., `EngineWrapper`)
- Functions: `snake_case` (e.g., `get_user`)
- Variables: `snake_case` (e.g., `user_id`)

### API Endpoints

- RESTful: `/api/v1/resource/` or `/api/v1/resource/{id}`
- HTTP Methods: GET, POST, PUT, DELETE

## Extending the Project

### Adding New Endpoints

1. Create a new file in `app/routers/`
2. Define FastAPI router
3. Register router in `main.py`

### Adding New C++ Functions

1. Add declaration in `engine.h`
2. Implement in `engine.cpp`
3. Update wrapper in `app/engine_wrapper.py`
4. Add endpoint in `app/routers/engine.py`

### Adding New Models

1. Add Pydantic schema in `app/models/schemas.py`
2. Use in routers for validation

## Next Steps

- [Contributing](contributing.md) - How to contribute to the project
- [Engine Documentation](../engine/index.md) - C++ library details
- [Server Documentation](../server/index.md) - API details

