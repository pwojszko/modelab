# Server Installation

## Requirements

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **pip** - Usually included with Python

## Step 1: Navigate to Server Folder

```bash
cd server
```

## Step 2: Create Virtual Environment (Recommended)

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac

```bash
python -m venv venv
source venv/bin/activate
```

After activating the virtual environment, you should see the `(venv)` prefix in your command prompt.

## Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 4: Configure C++ Library (Optional)

To use endpoints related to the C++ library, you need to have the library compiled.

See [Engine Compilation](../engine/compilation.md) for instructions.

After compiling, copy the library to the `server/` folder:

**Windows**:

```bash
copy ..\engine\build\bin\Release\engine.dll .
```

**Linux**:

```bash
cp ../engine/build/libengine.so .
```

**Mac**:

```bash
cp ../engine/build/libengine.dylib .
```

## Step 5: Run the Server

### Development Mode (with auto-reload)

```bash
uvicorn main:app --reload
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Verification

### Check Server Status

Open in browser: http://localhost:8000

You should see the welcome page.

### Check Health Check

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

### Check API Documentation

Open in browser:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Troubleshooting

### Problem: Module Import Error

**Symptoms**: `ModuleNotFoundError` or `ImportError`

**Solution**:

1. Make sure the virtual environment is active
2. Check installation: `pip list`
3. Reinstall: `pip install -r requirements.txt`

### Problem: Port Already in Use

**Symptoms**: `Address already in use`

**Solution**:

1. Change port: `uvicorn main:app --port 8001`
2. Or stop the process using port 8000

### Problem: C++ Library Not Found

**Symptoms**: Endpoints `/api/v1/engine/*` return an error

**Solution**:

1. Check if the library was compiled
2. Make sure the library is in the `server/` folder
3. Check the file name (should match your operating system)

## Next Steps

After successful installation:

- [API Endpoints](api.md) - Learn about available endpoints
- [Configuration](configuration.md) - Customize settings
- [Usage Examples](../examples.md) - See examples

