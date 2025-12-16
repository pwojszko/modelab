@echo off
REM Build script for Windows

echo Creating build directory...
if not exist build mkdir build
cd build

echo Running CMake...
cmake ..

if %ERRORLEVEL% NEQ 0 (
    echo CMake failed!
    pause
    exit /b 1
)

echo Building project...
cmake --build . --config Release

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Build completed successfully!
echo Library is in: build\bin\Release\engine.dll
echo.
pause
