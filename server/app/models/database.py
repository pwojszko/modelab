"""
Database models using SQLAlchemy.
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base


class EngineCalculation(Base):
    """
    Database model for storing engine calculation results.
    """
    __tablename__ = "engine_calculations"

    id = Column(Integer, primary_key=True, index=True)
    operation_type = Column(String, nullable=False, index=True)  # e.g., "add", "multiply", "factorial"
    input_data = Column(Text, nullable=False)  # JSON string of input parameters
    result = Column(Text, nullable=True)  # Result as string (can be int, float, or string)
    success = Column(Integer, nullable=False, default=1)  # 1 for success, 0 for failure
    message = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

