"""
Python wrapper for C++ engine library using ctypes.
"""
import ctypes
import os
import sys
from pathlib import Path

# Determine the library path based on the OS
def get_library_path():
    """Get the path to the compiled C++ library."""
    # Get the project root (three levels up from this file: app -> server -> modelslab)
    project_root = Path(__file__).parent.parent.parent
    engine_dir = project_root / "engine"
    build_dir = engine_dir / "build"
    
    # Try different possible locations
    if sys.platform == "win32":
        # Windows: library is in build/bin/Release/engine.dll
        lib_paths = [
            build_dir / "bin" / "Release" / "engine.dll",
            build_dir / "bin" / "engine.dll",
            build_dir / "lib" / "Release" / "engine.dll",
            build_dir / "lib" / "engine.dll",
            engine_dir / "engine.dll",  # Fallback
        ]
    elif sys.platform == "darwin":
        # macOS
        lib_paths = [
            build_dir / "lib" / "libengine.dylib",
            build_dir / "lib" / "engine.dylib",
            engine_dir / "libengine.dylib",
        ]
    else:
        # Linux
        lib_paths = [
            build_dir / "lib" / "libengine.so",
            build_dir / "lib" / "engine.so",
            engine_dir / "libengine.so",
        ]
    
    # Find the first existing library
    checked_paths = []
    for lib_path in lib_paths:
        try:
            lib_path_abs = lib_path.resolve()
            checked_paths.append(str(lib_path_abs))
            if lib_path_abs.exists():
                return str(lib_path_abs), checked_paths
        except (OSError, RuntimeError):
            # Path doesn't exist or can't be resolved
            checked_paths.append(str(lib_path))
            continue
    
    # If not found, return the most likely path for error message
    return None, checked_paths


def load_engine_library():
    """Load the C++ engine library."""
    lib_path, checked_paths = get_library_path()
    
    if lib_path is None:
        error_msg = (
            f"Engine library not found. Checked paths:\n" +
            "\n".join(f"  - {p}" for p in checked_paths) +
            f"\n\nPlease compile the C++ library first. See engine/README.md for instructions."
        )
        raise FileNotFoundError(error_msg)
    
    if not os.path.exists(lib_path):
        error_msg = (
            f"Engine library not found at {lib_path}. "
            f"Checked paths:\n" +
            "\n".join(f"  - {p}" for p in checked_paths) +
            f"\n\nPlease compile the C++ library first. See engine/README.md for instructions."
        )
        raise FileNotFoundError(error_msg)
    
    try:
        # Use absolute path and ensure it's a string
        lib_path_str = str(Path(lib_path).resolve())
        lib = ctypes.CDLL(lib_path_str)
        return lib
    except OSError as e:
        raise OSError(f"Failed to load engine library at {lib_path_str}: {e}")


# Load the library
try:
    _engine_lib = load_engine_library()
except (FileNotFoundError, OSError) as e:
    _engine_lib = None
    _load_error = str(e)


class EngineWrapper:
    """Wrapper class for C++ engine functions."""
    
    def __init__(self):
        if _engine_lib is None:
            raise RuntimeError(f"Cannot initialize EngineWrapper: {_load_error}")
        self.lib = _engine_lib
        self._setup_functions()
    
    def _setup_functions(self):
        """Setup function signatures for ctypes."""
        # int add(int a, int b)
        self.lib.add.argtypes = [ctypes.c_int, ctypes.c_int]
        self.lib.add.restype = ctypes.c_int
        
        # int multiply(int a, int b)
        self.lib.multiply.argtypes = [ctypes.c_int, ctypes.c_int]
        self.lib.multiply.restype = ctypes.c_int
        
        # long long factorial(int n)
        self.lib.factorial.argtypes = [ctypes.c_int]
        self.lib.factorial.restype = ctypes.c_int64
        
        # int process_string(const char* input, char* output, int output_size)
        self.lib.process_string.argtypes = [
            ctypes.c_char_p,
            ctypes.POINTER(ctypes.c_char),
            ctypes.c_int
        ]
        self.lib.process_string.restype = ctypes.c_int
        
        # double sum_array(double* array, int size)
        self.lib.sum_array.argtypes = [
            ctypes.POINTER(ctypes.c_double),
            ctypes.c_int
        ]
        self.lib.sum_array.restype = ctypes.c_double
    
    def add(self, a: int, b: int) -> int:
        """Add two numbers."""
        return self.lib.add(a, b)
    
    def multiply(self, a: int, b: int) -> int:
        """Multiply two numbers."""
        return self.lib.multiply(a, b)
    
    def factorial(self, n: int) -> int:
        """Calculate factorial."""
        return self.lib.factorial(n)
    
    def process_string(self, input_str: str) -> str:
        """Process string (convert to uppercase)."""
        input_bytes = input_str.encode('utf-8')
        output_size = len(input_bytes) + 1
        output_buffer = (ctypes.c_char * output_size)()
        
        result = self.lib.process_string(
            input_bytes,
            output_buffer,
            output_size
        )
        
        if result < 0:
            raise RuntimeError("String processing failed")
        
        return output_buffer.value.decode('utf-8')
    
    def sum_array(self, numbers: list[float]) -> float:
        """Sum array of numbers."""
        if not numbers:
            return 0.0
        
        array_type = ctypes.c_double * len(numbers)
        array = array_type(*numbers)
        
        return self.lib.sum_array(array, len(numbers))


# Global instance (lazy initialization)
_engine_instance = None


def get_engine() -> EngineWrapper:
    """Get or create the engine instance."""
    global _engine_instance
    if _engine_instance is None:
        _engine_instance = EngineWrapper()
    return _engine_instance


def is_engine_available() -> bool:
    """Check if the engine library is available."""
    return _engine_lib is not None
