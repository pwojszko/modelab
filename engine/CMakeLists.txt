cmake_minimum_required(VERSION 3.10)
project(Engine VERSION 1.0.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find Doxygen
find_package(Doxygen QUIET)

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

# Documentation target
if(DOXYGEN_FOUND)
    # Create a custom target to generate documentation using Doxyfile
    add_custom_target(docs
        COMMAND ${DOXYGEN_EXECUTABLE} ${CMAKE_CURRENT_SOURCE_DIR}/Doxyfile
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        COMMENT "Generating HTML documentation from Doxyfile"
        VERBATIM
    )
    
    message(STATUS "Doxygen found - 'docs' target available for generating documentation")
    message(STATUS "Run 'cmake --build . --target docs' to generate documentation")
else()
    message(STATUS "Doxygen not found - documentation will not be generated")
    message(STATUS "Install Doxygen to enable documentation generation")
endif()
