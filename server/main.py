from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import engine
from app.core.config import settings
from app.core.database import engine as db_engine, Base
from app.models import database
from app.admin import setup_admin

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="FastAPI Backend Application"
)

# Create database tables
Base.metadata.create_all(bind=db_engine)

# Set up SQLAdmin for database preview
admin = setup_admin(app)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(engine.router, prefix="/api/v1/engine", tags=["engine"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to FastAPI Backend",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

