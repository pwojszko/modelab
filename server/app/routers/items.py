from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
from app.models.schemas import ItemCreate, ItemUpdate, ItemResponse

router = APIRouter()

# In-memory storage (replace with database in production)
items_db = []
item_id_counter = 1


@router.post("/", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate, owner_id: int = 1):
    """Create a new item"""
    global item_id_counter
    
    new_item = {
        "id": item_id_counter,
        "title": item.title,
        "description": item.description,
        "price": item.price,
        "owner_id": owner_id,
        "created_at": datetime.now()
    }
    items_db.append(new_item)
    item_id_counter += 1
    
    return new_item


@router.get("/", response_model=List[ItemResponse])
async def get_items(skip: int = 0, limit: int = 100):
    """Get all items"""
    return items_db[skip:skip + limit]


@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int):
    """Get item by ID"""
    item = next((i for i in items_db if i["id"] == item_id), None)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return item


@router.put("/{item_id}", response_model=ItemResponse)
async def update_item(item_id: int, item_update: ItemUpdate):
    """Update item by ID"""
    item = next((i for i in items_db if i["id"] == item_id), None)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    
    if item_update.title is not None:
        item["title"] = item_update.title
    if item_update.description is not None:
        item["description"] = item_update.description
    if item_update.price is not None:
        item["price"] = item_update.price
    
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    """Delete item by ID"""
    global items_db
    item = next((i for i in items_db if i["id"] == item_id), None)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    items_db = [i for i in items_db if i["id"] != item_id]
    return None


