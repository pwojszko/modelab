cmake_minimum_required(VERSION 3.10)
project(Engine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set output directory
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

# Create shared library
add_library(engine SHARED engine.cpp engine.h)

# Define export macro for Windows
if(WIN32)
    target_compile_definitions(engine PRIVATE ENGINE_EXPORTS)
endif()

# On Windows, use .dll extension
if(WIN32)
    set_target_properties(engine PROPERTIES
        OUTPUT_NAME "engine"
        PREFIX ""
        SUFFIX ".dll"
    )
endif()

# On Linux/Mac, use .so/.dylib
if(UNIX AND NOT APPLE)
    set_target_properties(engine PROPERTIES
        OUTPUT_NAME "engine"
        SUFFIX ".so"
    )
endif()

if(APPLE)
    set_target_properties(engine PROPERTIES
        OUTPUT_NAME "engine"
        SUFFIX ".dylib"
    )
endif()
