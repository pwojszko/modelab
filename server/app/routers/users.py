from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
from app.models.schemas import UserCreate, UserResponse

router = APIRouter()

# In-memory storage (replace with database in production)
users_db = []
user_id_counter = 1


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    """Create a new user"""
    global user_id_counter
    
    # Check if user already exists
    if any(u["email"] == user.email for u in users_db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    new_user = {
        "id": user_id_counter,
        "email": user.email,
        "full_name": user.full_name,
        "is_active": True,
        "created_at": datetime.now()
    }
    users_db.append(new_user)
    user_id_counter += 1
    
    return new_user


@router.get("/", response_model=List[UserResponse])
async def get_users(skip: int = 0, limit: int = 100):
    """Get all users"""
    return users_db[skip:skip + limit]


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    """Get user by ID"""
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int):
    """Delete user by ID"""
    global users_db
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    users_db = [u for u in users_db if u["id"] != user_id]
    return None



