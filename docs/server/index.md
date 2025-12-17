# Server - FastAPI Backend

## Overview

Server is the application backend built with FastAPI - a modern, fast web framework for building APIs in Python. The server provides RESTful API with automatic documentation and C++ library integration.

## Key Features

- ✅ **RESTful API** - Full support for CRUD operations
- ✅ **Automatic documentation** - Swagger UI available at `/docs`
- ✅ **Data validation** - Uses Pydantic for request and response validation
- ✅ **CORS** - Configured middleware for Cross-Origin Resource Sharing
- ✅ **Type hints** - Full support for Python type hints
- ✅ **C++ Integration** - Communication with C++ library for high-performance computations

## Project Structure

```
server/
├── main.py                 # Main FastAPI application file
├── requirements.txt        # Project dependencies
├── app/
│   ├── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py      # Application configuration
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py     # Pydantic models (data schemas)
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── users.py       # User endpoints
│   │   ├── items.py       # Item endpoints
│   │   └── engine.py      # C++ engine endpoints
│   └── engine_wrapper.py  # Python wrapper for C++ library
└── README.md              # This file
```

## Quick Start

### Installation

```bash
cd server
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

### Running

```bash
uvicorn main:app --reload
```

The server will be available at: `http://localhost:8000`

## API Documentation

After starting the server, interactive documentation is available at:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

See [API Documentation](api.md) for a complete list of endpoints.

## Configuration

See [Configuration](configuration.md) for application configuration details.

## C++ Integration

The server uses the C++ library through a Python wrapper (`app/engine_wrapper.py`).

See [Engine Documentation](../engine/index.md) for C++ library details.

## Next Steps

- [Installation](installation.md) - Detailed installation instructions
- [API Endpoints](api.md) - Complete list of endpoints
- [Configuration](configuration.md) - Customize settings

