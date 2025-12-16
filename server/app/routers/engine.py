"""
FastAPI router for C++ engine integration.
"""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from app.engine_wrapper import get_engine, is_engine_available

router = APIRouter()


class AddRequest(BaseModel):
    a: int
    b: int


class MultiplyRequest(BaseModel):
    a: int
    b: int


class FactorialRequest(BaseModel):
    n: int


class ProcessStringRequest(BaseModel):
    text: str


class SumArrayRequest(BaseModel):
    numbers: List[float]


class EngineResponse(BaseModel):
    result: Optional[float | int | str] = None
    success: bool
    message: str


@router.get("/status", response_model=EngineResponse)
async def engine_status():
    """Check if C++ engine is available."""
    available = is_engine_available()
    return EngineResponse(
        result=None,
        success=available,
        message="Engine is available" if available else "Engine library not found. Please compile the C++ library first."
    )


@router.post("/add", response_model=EngineResponse)
async def add_numbers(request: AddRequest):
    """Add two numbers using C++ engine."""
    try:
        engine = get_engine()
        result = engine.add(request.a, request.b)
        return EngineResponse(
            result=result,
            success=True,
            message=f"Successfully added {request.a} + {request.b}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/multiply", response_model=EngineResponse)
async def multiply_numbers(request: MultiplyRequest):
    """Multiply two numbers using C++ engine."""
    try:
        engine = get_engine()
        result = engine.multiply(request.a, request.b)
        return EngineResponse(
            result=result,
            success=True,
            message=f"Successfully multiplied {request.a} * {request.b}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/factorial", response_model=EngineResponse)
async def calculate_factorial(request: FactorialRequest):
    """Calculate factorial using C++ engine."""
    if request.n < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Factorial is not defined for negative numbers"
        )
    
    if request.n > 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Factorial for numbers > 20 may cause overflow"
        )
    
    try:
        engine = get_engine()
        result = engine.factorial(request.n)
        return EngineResponse(
            result=result,
            success=True,
            message=f"Successfully calculated factorial of {request.n}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/process-string", response_model=EngineResponse)
async def process_string(request: ProcessStringRequest):
    """Process string (convert to uppercase) using C++ engine."""
    try:
        engine = get_engine()
        result = engine.process_string(request.text)
        return EngineResponse(
            result=result,
            success=True,
            message="Successfully processed string"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/sum-array", response_model=EngineResponse)
async def sum_array(request: SumArrayRequest):
    """Sum array of numbers using C++ engine."""
    try:
        engine = get_engine()
        result = engine.sum_array(request.numbers)
        return EngineResponse(
            result=result,
            success=True,
            message=f"Successfully summed {len(request.numbers)} numbers"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )
