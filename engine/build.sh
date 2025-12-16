#!/bin/bash
# Build script for Linux/Mac

set -e

echo "Creating build directory..."
mkdir -p build
cd build

echo "Running CMake..."
cmake ..

echo "Building project..."
make

echo ""
echo "Build completed successfully!"
echo "Library should be in: build/lib/libengine.so (Linux) or build/lib/libengine.dylib (Mac)"
