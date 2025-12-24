"""
SQLAdmin configuration for database preview and management.
"""
from sqladmin import Admin, ModelView
from app.core.database import engine
from app.models.database import EngineCalculation


class EngineCalculationAdmin(ModelView, model=EngineCalculation):
    """
    Admin view for EngineCalculation model.
    """
    column_list = [
        EngineCalculation.id,
        EngineCalculation.operation_type,
        EngineCalculation.input_data,
        EngineCalculation.result,
        EngineCalculation.success,
        EngineCalculation.message,
        EngineCalculation.created_at,
    ]
    column_searchable_list = [EngineCalculation.operation_type, EngineCalculation.message]
    column_sortable_list = [EngineCalculation.id, EngineCalculation.created_at, EngineCalculation.operation_type]
    column_details_list = [
        EngineCalculation.id,
        EngineCalculation.operation_type,
        EngineCalculation.input_data,
        EngineCalculation.result,
        EngineCalculation.success,
        EngineCalculation.message,
        EngineCalculation.created_at,
    ]
    name = "Engine Calculation"
    name_plural = "Engine Calculations"
    icon = "fa-solid fa-calculator"


def setup_admin(app):
    """
    Set up SQLAdmin with the FastAPI app.
    """
    admin = Admin(
        app=app,
        engine=engine,
        base_url="/admin",
        title="Modelab Database Admin",
    )
    
    # Register models
    admin.add_view(EngineCalculationAdmin)
    
    return admin

