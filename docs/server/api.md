# API Endpoints - Server

Complete list of API endpoints available in the FastAPI server.

## Access to Interactive Documentation

After starting the server, interactive documentation is available at:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Basic Endpoints

### `GET /`

API home page.

**Response**:

```json
{
  "message": "Welcome to ModelSLab API",
  "version": "1.0.0"
}
```

### `GET /health`

Health check endpoint.

**Response**:

```json
{
  "status": "healthy"
}
```

## User Endpoints (`/api/v1/users`)

### `POST /api/v1/users/`

Creates a new user.

**Request Body**:

```json
{
  "email": "user@example.com",
  "full_name": "John Doe",
  "password": "password123"
}
```

**Response**: `201 Created`

```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe"
}
```

### `GET /api/v1/users/`

Retrieves a list of all users.

**Response**: `200 OK`

```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe"
  }
]
```

### `GET /api/v1/users/{user_id}`

Retrieves a user by ID.

**Parameters**:

- `user_id` (path): User ID

**Response**: `200 OK`

```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe"
}
```

**Errors**:

- `404 Not Found` - User does not exist

### `DELETE /api/v1/users/{user_id}`

Deletes a user.

**Parameters**:

- `user_id` (path): User ID

**Response**: `200 OK`

```json
{
  "message": "User deleted successfully"
}
```

**Errors**:

- `404 Not Found` - User does not exist

## Item Endpoints (`/api/v1/items`)

### `POST /api/v1/items/`

Creates a new item.

**Query Parameters**:

- `owner_id` (required): Owner ID

**Request Body**:

```json
{
  "title": "Example item",
  "description": "Item description",
  "price": 99.99
}
```

**Response**: `201 Created`

```json
{
  "id": 1,
  "title": "Example item",
  "description": "Item description",
  "price": 99.99,
  "owner_id": 1
}
```

### `GET /api/v1/items/`

Retrieves a list of all items.

**Response**: `200 OK`

```json
[
  {
    "id": 1,
    "title": "Example item",
    "description": "Item description",
    "price": 99.99,
    "owner_id": 1
  }
]
```

### `GET /api/v1/items/{item_id}`

Retrieves an item by ID.

**Parameters**:

- `item_id` (path): Item ID

**Response**: `200 OK`

```json
{
  "id": 1,
  "title": "Example item",
  "description": "Item description",
  "price": 99.99,
  "owner_id": 1
}
```

**Errors**:

- `404 Not Found` - Item does not exist

### `PUT /api/v1/items/{item_id}`

Updates an item.

**Parameters**:

- `item_id` (path): Item ID

**Request Body**:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "price": 149.99
}
```

**Response**: `200 OK`

```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "price": 149.99,
  "owner_id": 1
}
```

**Errors**:

- `404 Not Found` - Item does not exist

### `DELETE /api/v1/items/{item_id}`

Deletes an item.

**Parameters**:

- `item_id` (path): Item ID

**Response**: `200 OK`

```json
{
  "message": "Item deleted successfully"
}
```

**Errors**:

- `404 Not Found` - Item does not exist

## Engine Endpoints - C++ Integration (`/api/v1/engine`)

### `GET /api/v1/engine/status`

Checks C++ library availability.

**Response**: `200 OK`

```json
{
  "status": "available",
  "message": "C++ engine library is loaded and ready"
}
```

Or if the library is not available:

```json
{
  "status": "unavailable",
  "message": "C++ engine library not found"
}
```

### `POST /api/v1/engine/add`

Adds two numbers using the C++ library.

**Request Body**:

```json
{
  "a": 5,
  "b": 3
}
```

**Response**: `200 OK`

```json
{
  "result": 8
}
```

### `POST /api/v1/engine/multiply`

Multiplies two numbers using the C++ library.

**Request Body**:

```json
{
  "a": 4,
  "b": 7
}
```

**Response**: `200 OK`

```json
{
  "result": 28
}
```

### `POST /api/v1/engine/factorial`

Calculates factorial using the C++ library.

**Request Body**:

```json
{
  "n": 10
}
```

**Response**: `200 OK`

```json
{
  "result": 3628800
}
```

### `POST /api/v1/engine/process-string`

Processes a string (converts to uppercase) using the C++ library.

**Request Body**:

```json
{
  "input": "Hello World"
}
```

**Response**: `200 OK`

```json
{
  "result": "HELLO WORLD"
}
```

### `POST /api/v1/engine/sum-array`

Sums array elements using the C++ library.

**Request Body**:

```json
{
  "array": [1.5, 2.5, 3.5, 4.5]
}
```

**Response**: `200 OK`

```json
{
  "result": 12.0
}
```

## HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

## Usage Examples

See [Usage Examples](../examples.md) for more examples using curl and other tools.

## Next Steps

- [Configuration](configuration.md) - Customize API settings
- [Engine Documentation](../engine/index.md) - Learn about C++ functions
- [Usage Examples](../examples.md) - More examples
