# ModelSLab

<div style="text-align: center; margin: 2em 0;">
  <h1 style="font-size: 3em; margin-bottom: 0.5em;">🚀 ModelSLab</h1>
  <p style="font-size: 1.2em; color: #666;">
    Full-stack project consisting of a C++ library and FastAPI server
  </p>
</div>

## 📋 About the Project

ModelSLab is an application consisting of three main components:

- **Engine** - C++ library containing functions for mathematical calculations and data processing
- **Server** - FastAPI backend providing REST API with C++ library integration
- **Client** - Folder for future client application (frontend)

## 🎯 Key Features

- ⚡ **High Performance** - C++ library for fast computations
- 🔌 **REST API** - Full RESTful API with automatic Swagger documentation
- 📚 **Documentation** - Complete documentation for all components
- 🛠️ **Easy Integration** - Simple interface between Python and C++

## 🚀 Quick Start

### 1. Compile C++ Library

```bash
cd engine
mkdir build && cd build
cmake ..
cmake --build . --config Release
```

### 2. Run Server

```bash
cd server
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Access API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📖 Documentation

- [Project Overview](introduction/overview.md)
- [System Architecture](introduction/architecture.md)
- [Engine Documentation (C++)](engine/index.md)
- [Server Documentation (FastAPI)](server/index.md)
- [Usage Examples](examples.md)

## 🛠️ Technologies

- **C++** - Computational library
- **CMake** - Build system
- **Doxygen** - C++ documentation
- **Python 3.8+** - Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

---

<div style="text-align: center; margin-top: 3em;">
  <a href="introduction/overview.md" class="md-button md-button--primary">
    Get Started →
  </a>
</div>
