"""
FastAPI router for C++ engine integration.
"""
from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Optional
import json
from sqlalchemy.orm import Session
from app.engine_wrapper import get_engine, is_engine_available
from app.core.database import get_db
from app.models.database import EngineCalculation
from app.models.schemas import EngineCalculationResponse

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


@router.get("/calculations", response_model=List[EngineCalculationResponse])
async def get_calculations(db: Session = Depends(get_db)):
    """Get list of all engine calculations."""
    calculations = db.query(EngineCalculation).order_by(EngineCalculation.created_at.desc()).all()
    
    # Convert success integer (1/0) to boolean and create response objects
    return [
        EngineCalculationResponse(
            id=calc.id,
            operation_type=calc.operation_type,
            input_data=calc.input_data,
            result=calc.result,
            success=bool(calc.success),
            message=calc.message,
            created_at=calc.created_at
        )
        for calc in calculations
    ]


@router.post("/add", response_model=EngineResponse)
async def add_numbers(request: AddRequest, db: Session = Depends(get_db)):
    """Add two numbers using C++ engine."""
    input_data = json.dumps({"a": request.a, "b": request.b})
    try:
        engine = get_engine()
        result = engine.add(request.a, request.b)
        response = EngineResponse(
            result=result,
            success=True,
            message=f"Successfully added {request.a} + {request.b}"
        )
        
        # Save to database
        db_calculation = EngineCalculation(
            operation_type="add",
            input_data=input_data,
            result=str(result),
            success=1,
            message=response.message
        )
        db.add(db_calculation)
        db.commit()
        
        return response
    except Exception as e:
        # Save failed calculation to database
        db_calculation = EngineCalculation(
            operation_type="add",
            input_data=input_data,
            result=None,
            success=0,
            message=f"Engine error: {str(e)}"
        )
        db.add(db_calculation)
        db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/multiply", response_model=EngineResponse)
async def multiply_numbers(request: MultiplyRequest, db: Session = Depends(get_db)):
    """Multiply two numbers using C++ engine."""
    input_data = json.dumps({"a": request.a, "b": request.b})
    try:
        engine = get_engine()
        result = engine.multiply(request.a, request.b)
        response = EngineResponse(
            result=result,
            success=True,
            message=f"Successfully multiplied {request.a} * {request.b}"
        )
        
        # Save to database
        db_calculation = EngineCalculation(
            operation_type="multiply",
            input_data=input_data,
            result=str(result),
            success=1,
            message=response.message
        )
        db.add(db_calculation)
        db.commit()
        
        return response
    except Exception as e:
        # Save failed calculation to database
        db_calculation = EngineCalculation(
            operation_type="multiply",
            input_data=input_data,
            result=None,
            success=0,
            message=f"Engine error: {str(e)}"
        )
        db.add(db_calculation)
        db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/factorial", response_model=EngineResponse)
async def calculate_factorial(request: FactorialRequest, db: Session = Depends(get_db)):
    """Calculate factorial using C++ engine."""
    input_data = json.dumps({"n": request.n})
    
    if request.n < 0:
        # Save failed validation to database
        db_calculation = EngineCalculation(
            operation_type="factorial",
            input_data=input_data,
            result=None,
            success=0,
            message="Factorial is not defined for negative numbers"
        )
        db.add(db_calculation)
        db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Factorial is not defined for negative numbers"
        )
    
    if request.n > 20:
        # Save failed validation to database
        db_calculation = EngineCalculation(
            operation_type="factorial",
            input_data=input_data,
            result=None,
            success=0,
            message="Factorial for numbers > 20 may cause overflow"
        )
        db.add(db_calculation)
        db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Factorial for numbers > 20 may cause overflow"
        )
    
    try:
        engine = get_engine()
        result = engine.factorial(request.n)
        response = EngineResponse(
            result=result,
            success=True,
            message=f"Successfully calculated factorial of {request.n}"
        )
        
        # Save to database
        db_calculation = EngineCalculation(
            operation_type="factorial",
            input_data=input_data,
            result=str(result),
            success=1,
            message=response.message
        )
        db.add(db_calculation)
        db.commit()
        
        return response
    except Exception as e:
        # Save failed calculation to database
        db_calculation = EngineCalculation(
            operation_type="factorial",
            input_data=input_data,
            result=None,
            success=0,
            message=f"Engine error: {str(e)}"
        )
        db.add(db_calculation)
        db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/process-string", response_model=EngineResponse)
async def process_string(request: ProcessStringRequest, db: Session = Depends(get_db)):
    """Process string (convert to uppercase) using C++ engine."""
    input_data = json.dumps({"text": request.text})
    try:
        engine = get_engine()
        result = engine.process_string(request.text)
        response = EngineResponse(
            result=result,
            success=True,
            message="Successfully processed string"
        )
        
        # Save to database
        db_calculation = EngineCalculation(
            operation_type="process-string",
            input_data=input_data,
            result=str(result),
            success=1,
            message=response.message
        )
        db.add(db_calculation)
        db.commit()
        
        return response
    except Exception as e:
        # Save failed calculation to database
        db_calculation = EngineCalculation(
            operation_type="process-string",
            input_data=input_data,
            result=None,
            success=0,
            message=f"Engine error: {str(e)}"
        )
        db.add(db_calculation)
        db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )


@router.post("/sum-array", response_model=EngineResponse)
async def sum_array(request: SumArrayRequest, db: Session = Depends(get_db)):
    """Sum array of numbers using C++ engine."""
    input_data = json.dumps({"numbers": request.numbers})
    try:
        engine = get_engine()
        result = engine.sum_array(request.numbers)
        response = EngineResponse(
            result=result,
            success=True,
            message=f"Successfully summed {len(request.numbers)} numbers"
        )
        
        # Save to database
        db_calculation = EngineCalculation(
            operation_type="sum-array",
            input_data=input_data,
            result=str(result),
            success=1,
            message=response.message
        )
        db.add(db_calculation)
        db.commit()
        
        return response
    except Exception as e:
        # Save failed calculation to database
        db_calculation = EngineCalculation(
            operation_type="sum-array",
            input_data=input_data,
            result=None,
            success=0,
            message=f"Engine error: {str(e)}"
        )
        db.add(db_calculation)
        db.commit()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Engine error: {str(e)}"
        )
