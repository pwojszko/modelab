# Usage Examples

Collection of examples showing how to use the ModelSLab API.

## Basic Operations

### Check Server Status

```bash
curl http://localhost:8000/health
```

**Response**:

```json
{
  "status": "healthy"
}
```

### Check C++ Library Status

```bash
curl http://localhost:8000/api/v1/engine/status
```

**Response**:

```json
{
  "status": "available",
  "message": "C++ engine library is loaded and ready"
}
```

## User Operations

### Create User

```bash
curl -X POST "http://localhost:8000/api/v1/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "full_name": "John Doe",
    "password": "securepassword123"
  }'
```

**Response**:

```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "full_name": "John Doe"
}
```

### Get List of Users

```bash
curl http://localhost:8000/api/v1/users/
```

**Response**:

```json
[
  {
    "id": 1,
    "email": "john.doe@example.com",
    "full_name": "John Doe"
  }
]
```

### Get User by ID

```bash
curl http://localhost:8000/api/v1/users/1
```

**Response**:

```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "full_name": "John Doe"
}
```

### Delete User

```bash
curl -X DELETE http://localhost:8000/api/v1/users/1
```

**Response**:

```json
{
  "message": "User deleted successfully"
}
```

## Item Operations

### Create Item

```bash
curl -X POST "http://localhost:8000/api/v1/items/?owner_id=1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dell XPS Laptop",
    "description": "High-quality laptop for work",
    "price": 4999.99
  }'
```

**Response**:

```json
{
  "id": 1,
  "title": "Dell XPS Laptop",
  "description": "High-quality laptop for work",
  "price": 4999.99,
  "owner_id": 1
}
```

### Get List of Items

```bash
curl http://localhost:8000/api/v1/items/
```

### Update Item

```bash
curl -X PUT "http://localhost:8000/api/v1/items/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dell XPS Laptop (Updated)",
    "description": "New description",
    "price": 4499.99
  }'
```

### Delete Item

```bash
curl -X DELETE http://localhost:8000/api/v1/items/1
```

## Engine Operations (C++)

### Add Numbers

```bash
curl -X POST "http://localhost:8000/api/v1/engine/add" \
  -H "Content-Type: application/json" \
  -d '{
    "a": 15,
    "b": 27
  }'
```

**Response**:

```json
{
  "result": 42
}
```

### Multiply Numbers

```bash
curl -X POST "http://localhost:8000/api/v1/engine/multiply" \
  -H "Content-Type: application/json" \
  -d '{
    "a": 6,
    "b": 7
  }'
```

**Response**:

```json
{
  "result": 42
}
```

### Calculate Factorial

```bash
curl -X POST "http://localhost:8000/api/v1/engine/factorial" \
  -H "Content-Type: application/json" \
  -d '{
    "n": 10
  }'
```

**Response**:

```json
{
  "result": 3628800
}
```

### Process String

```bash
curl -X POST "http://localhost:8000/api/v1/engine/process-string" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Hello World!"
  }'
```

**Response**:

```json
{
  "result": "HELLO WORLD!"
}
```

### Sum Array

```bash
curl -X POST "http://localhost:8000/api/v1/engine/sum-array" \
  -H "Content-Type: application/json" \
  -d '{
    "array": [10.5, 20.3, 30.7, 40.1, 50.9]
  }'
```

**Response**:

```json
{
  "result": 152.5
}
```

## Usage in Python

### Example with requests

```python
import requests

BASE_URL = "http://localhost:8000"

# Adding numbers
response = requests.post(
    f"{BASE_URL}/api/v1/engine/add",
    json={"a": 5, "b": 3}
)
print(response.json())  # {"result": 8}

# Creating a user
response = requests.post(
    f"{BASE_URL}/api/v1/users/",
    json={
        "email": "test@example.com",
        "full_name": "Test User",
        "password": "password123"
    }
)
print(response.json())
```

### Example with httpx (async)

```python
import httpx
import asyncio

async def main():
    async with httpx.AsyncClient() as client:
        # Adding numbers
        response = await client.post(
            "http://localhost:8000/api/v1/engine/add",
            json={"a": 5, "b": 3}
        )
        print(response.json())

asyncio.run(main())
```

## Usage in JavaScript (fetch)

```javascript
// Adding numbers
fetch("http://localhost:8000/api/v1/engine/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    a: 5,
    b: 3,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data)); // {result: 8}
```

## Usage in JavaScript (axios)

```javascript
import axios from "axios";

// Adding numbers
axios
  .post("http://localhost:8000/api/v1/engine/add", {
    a: 5,
    b: 3,
  })
  .then((response) => {
    console.log(response.data); // {result: 8}
  })
  .catch((error) => {
    console.error(error);
  });
```

## Error Handling

### Example Error Handling in Python

```python
import requests

try:
    response = requests.get("http://localhost:8000/api/v1/users/999")
    response.raise_for_status()
    print(response.json())
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 404:
        print("User not found")
    else:
        print(f"HTTP error: {e}")
except requests.exceptions.RequestException as e:
    print(f"Connection error: {e}")
```

## Next Steps

- [API Endpoints](../server/api.md) - Complete list of endpoints
- [Server Documentation](../server/index.md) - More information about the server
- [Engine Documentation](../engine/index.md) - C++ library functions
