# FastAPI Backend

Backend application built with FastAPI - a modern, fast web framework for building APIs with Python.

## 🚀 Features

- **RESTful API** - Full support for CRUD operations
- **Automatic documentation** - Swagger UI available at `/docs`
- **Data validation** - Uses Pydantic for request and response validation
- **CORS** - Configured middleware for Cross-Origin Resource Sharing
- **Type hints** - Full support for Python type hints

## 📋 Requirements

- Python 3.8+
- pip

## 🔧 Installation

1. Navigate to the server folder:

```bash
cd server
```

2. Create a virtual environment (optional, but recommended):

```bash
python -m venv venv
```

3. Activate the virtual environment:

   - Windows:

   ```bash
   venv\Scripts\activate
   ```

   - Linux/Mac:

   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

## ▶️ Running the Server

Run the development server:

```bash
uvicorn main:app --reload
```

The server will be available at: `http://localhost:8000`

## 📚 API Documentation

After starting the server, interactive documentation is available at:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🛣️ API Endpoints

### Users (`/api/v1/users`)

- `POST /api/v1/users/` - Create a new user
- `GET /api/v1/users/` - Get list of users
- `GET /api/v1/users/{user_id}` - Get user by ID
- `DELETE /api/v1/users/{user_id}` - Delete user

### Items (`/api/v1/items`)

- `POST /api/v1/items/` - Create a new item
- `GET /api/v1/items/` - Get list of items
- `GET /api/v1/items/{item_id}` - Get item by ID
- `PUT /api/v1/items/{item_id}` - Update item
- `DELETE /api/v1/items/{item_id}` - Delete item

### Other

- `GET /` - Home page
- `GET /health` - Health check endpoint

## 📁 Project Structure

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
│   └── routers/
│       ├── __init__.py
│       ├── users.py       # User endpoints
│       └── items.py       # Item endpoints
└── README.md              # This file
```

## ⚙️ Configuration

Application configuration is located in `app/core/config.py`. You can create a `.env` file in the `server/` folder to override default settings:

```env
PROJECT_NAME=FastAPI Backend
VERSION=1.0.0
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

## 📝 Usage Examples

### Create a user

```bash
curl -X POST "http://localhost:8000/api/v1/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "full_name": "John Doe",
    "password": "securepassword123"
  }'
```

### Get list of users

```bash
curl "http://localhost:8000/api/v1/users/"
```

### Create an item

```bash
curl -X POST "http://localhost:8000/api/v1/items/?owner_id=1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Example item",
    "description": "Item description",
    "price": 99.99
  }'
```

## ⚠️ Notes

- Currently, data is stored in memory (in-memory storage). Data will be lost after server restart.
- For production, you should add a database (e.g., SQLAlchemy with PostgreSQL or SQLite).
- User passwords are not currently hashed - you should add password hashing before deploying to production.

## 🛠️ Technologies

- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation and settings management
- **Python 3.8+** - Programming language

## 📄 License

This project is part of a larger application.
