from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Engine calculation schemas
class EngineCalculationResponse(BaseModel):
    id: int
    operation_type: str
    input_data: str
    result: Optional[str] = None
    success: bool
    message: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True



