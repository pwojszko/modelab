# Server Configuration

## Configuration File

Application configuration is located in `app/core/config.py`. The application uses Pydantic Settings for configuration management.

## Environment Variables

You can create a `.env` file in the `server/` folder to override default settings.

### Example `.env` File

```env
PROJECT_NAME=ModelSLab API
VERSION=1.0.0
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
DEBUG=true
```

## Available Settings

### `PROJECT_NAME`

Project name displayed in API documentation.

**Default value**: `"FastAPI Backend"`

**Example**:

```env
PROJECT_NAME=ModelSLab API
```

### `VERSION`

Application version.

**Default value**: `"1.0.0"`

**Example**:

```env
VERSION=1.0.0
```

### `CORS_ORIGINS`

List of allowed origins for CORS (Cross-Origin Resource Sharing).

**Default value**: `["*"]` (all origins)

**Example**:

```env
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173", "https://example.com"]
```

**Note**: In production, do not use `["*"]` - specify concrete domains.

### `DEBUG`

Debug mode.

**Default value**: `false`

**Example**:

```env
DEBUG=true
```

## Uvicorn Server Configuration

You can pass additional options to Uvicorn when starting:

### Port

```bash
uvicorn main:app --port 8001
```

### Host

```bash
uvicorn main:app --host 0.0.0.0
```

### Workers (production)

```bash
uvicorn main:app --workers 4
```

### Full Configuration

```bash
uvicorn main:app \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --log-level info
```

## C++ Library Configuration

### Library Path

By default, the Python wrapper looks for the library in the `server/` folder with the name:

- `engine.dll` (Windows)
- `libengine.so` (Linux)
- `libengine.dylib` (Mac)

You can change the path in `app/engine_wrapper.py`:

```python
# For Windows
lib_path = "C:/path/to/engine.dll"

# For Linux
lib_path = "/path/to/libengine.so"

# For Mac
lib_path = "/path/to/libengine.dylib"
```

### Environment Variables for Library

**Linux**:

```bash
export LD_LIBRARY_PATH=/path/to/library:$LD_LIBRARY_PATH
```

**Mac**:

```bash
export DYLD_LIBRARY_PATH=/path/to/library:$DYLD_LIBRARY_PATH
```

## Production Configuration

### Security

1. **CORS**: Limit to specific domains
2. **HTTPS**: Use reverse proxy (Nginx, Traefik) with SSL
3. **Secrets**: Store passwords and keys in environment variables
4. **Rate Limiting**: Add rate limiting for API

### Example Production Configuration

```env
PROJECT_NAME=ModelSLab API
VERSION=1.0.0
CORS_ORIGINS=["https://yourdomain.com"]
DEBUG=false
```

### Running in Production

```bash
uvicorn main:app \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --log-level warning \
  --no-access-log
```

## Troubleshooting

### Problem: Environment Variables Not Loaded

**Solution**:

1. Make sure the `.env` file is in the `server/` folder
2. Check the `.env` file syntax (no spaces around `=`)
3. Restart the server

### Problem: CORS Blocks Requests

**Solution**:

1. Add the client domain to `CORS_ORIGINS`
2. Check if the domain is correctly formatted (with `http://` or `https://`)

## Next Steps

- [API Endpoints](api.md) - Learn about available endpoints
- [Installation](installation.md) - Detailed installation instructions
- [Engine Documentation](../engine/index.md) - C++ integration


