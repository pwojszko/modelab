@echo off
REM Hot-reload script for Windows
REM Monitors engine source files and automatically rebuilds when changes are detected

echo Starting Engine Hot-Reload...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if watchdog is installed
python -c "import watchdog" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Installing watchdog package...
    pip install watchdog
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install watchdog
        pause
        exit /b 1
    )
)

REM Run the hot-reload script
python hot_reload.py

pause
