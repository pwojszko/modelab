#!/usr/bin/env python3
"""
Hot-reload script for C++ engine library.
Monitors source files and automatically rebuilds the library when changes are detected.
"""
import os
import sys
import subprocess
import time
import urllib.request
import urllib.error
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Get the engine directory (where this script is located)
ENGINE_DIR = Path(__file__).parent.resolve()
BUILD_DIR = ENGINE_DIR / "build"

# FastAPI server URL for auto-reload (set via environment variable or default)
FASTAPI_URL = os.environ.get("FASTAPI_URL", "http://localhost:8000")


class EngineBuildHandler(FileSystemEventHandler):
    """Handler for file system events that trigger rebuilds."""
    
    def __init__(self):
        self.last_build_time = 0
        self.build_cooldown = 2  # Minimum seconds between builds
        self.building = False
        
    def should_rebuild(self, file_path: Path) -> bool:
        """Check if the file change should trigger a rebuild."""
        # Only watch source files
        if file_path.suffix not in ['.cpp', '.h', '.hpp', '.c']:
            return False
        
        # Ignore files in build directory
        if 'build' in file_path.parts:
            return False
        
        # Ignore temporary/backup files
        if file_path.name.startswith('.') or file_path.name.endswith('~'):
            return False
        
        return True
    
    def on_modified(self, event):
        """Handle file modification events."""
        if event.is_directory:
            return
        
        file_path = Path(event.src_path)
        
        if not self.should_rebuild(file_path):
            return
        
        # Cooldown to avoid multiple builds for the same change
        current_time = time.time()
        if current_time - self.last_build_time < self.build_cooldown:
            return
        
        if self.building:
            return
        
        self.last_build_time = current_time
        self.rebuild_library(file_path)
    
    def _is_dll_locked(self, dll_path: Path) -> bool:
        """Check if DLL is locked (Windows only)."""
        if sys.platform != "win32" or not dll_path.exists():
            return False
        
        try:
            # Try to open the file in exclusive mode
            with open(dll_path, 'r+b') as f:
                pass
            return False
        except (IOError, OSError, PermissionError):
            return True
    
    def _generate_docs(self):
        """Generate documentation using Doxygen."""
        try:
            if sys.platform == "win32":
                docs_cmd = ['cmake', '--build', '.', '--target', 'docs', '--config', 'Release']
            else:
                docs_cmd = ['cmake', '--build', '.', '--target', 'docs']
            
            print("📚 Generating documentation...")
            print(f"   Command: {' '.join(docs_cmd)}")
            print(f"   Working directory: {BUILD_DIR}")
            
            docs_result = subprocess.run(
                docs_cmd,
                cwd=BUILD_DIR,
                shell=False,
                capture_output=True,
                text=True
            )
            
            if docs_result.returncode == 0:
                print("✅ Documentation generated successfully!")
                docs_path = ENGINE_DIR / "docs" / "html" / "index.html"
                if docs_path.exists():
                    print(f"   📄 Documentation available at: {docs_path}")
                else:
                    print(f"   📄 Documentation should be in: {ENGINE_DIR / 'docs' / 'html'}")
            else:
                print(f"⚠️  Documentation generation failed (exit code: {docs_result.returncode})")
                
                # Check if Doxygen is not available
                output_text = (docs_result.stdout or "") + (docs_result.stderr or "")
                if "doxygen" in output_text.lower() and ("not found" in output_text.lower() or "could not find" in output_text.lower()):
                    print("   ❌ Doxygen is not installed or not found in PATH")
                    print("   💡 Install Doxygen to enable documentation generation:")
                    if sys.platform == "win32":
                        print("      - Download from https://www.doxygen.nl/download.html")
                        print("      - Or use: choco install doxygen")
                    elif sys.platform == "darwin":
                        print("      - brew install doxygen")
                    else:
                        print("      - sudo apt-get install doxygen (Ubuntu/Debian)")
                        print("      - sudo yum install doxygen (RHEL/CentOS)")
                else:
                    print("   📤 Output:")
                    if docs_result.stdout:
                        print(f"   stdout: {docs_result.stdout[:300]}...")
                    if docs_result.stderr:
                        print(f"   stderr: {docs_result.stderr[:300]}...")
        except Exception as e:
            # Documentation generation is optional, so don't fail the build
            print(f"⚠️  Could not generate documentation: {e}")
            import traceback
            print(f"   Error details: {traceback.format_exc()[:200]}...")
    
    def _try_auto_reload(self) -> bool:
        """Try to automatically reload the library via FastAPI endpoint."""
        try:
            reload_url = f"{FASTAPI_URL}/api/v1/engine/reload"
            req = urllib.request.Request(
                reload_url,
                method="POST",
                headers={"Content-Type": "application/json"}
            )
            
            with urllib.request.urlopen(req, timeout=2) as response:
                if response.status == 200:
                    return True
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError):
            # Server not running or endpoint not available - that's okay
            pass
        except Exception:
            # Any other error - ignore it
            pass
        
        return False
    
    def rebuild_library(self, changed_file: Path):
        """Rebuild the C++ library."""
        self.building = True
        print(f"\n{'='*60}")
        print(f"🔍 Change detected in: {changed_file.name}")
        print(f"{'='*60}\n")
        
        # Check if DLL is locked before building (Windows)
        if sys.platform == "win32":
            dll_path = BUILD_DIR / "bin" / "Release" / "engine.dll"
            if dll_path.exists() and self._is_dll_locked(dll_path):
                print("⚠️  Warning: DLL is currently locked by another process (likely FastAPI server)")
                print("   The build may fail. Consider stopping the server first.")
                print("   Continuing with build attempt...\n")
        
        try:
            # Determine build commands based on OS
            if sys.platform == "win32":
                cmake_cmd, build_cmd = self._build_windows()
            else:
                cmake_cmd, build_cmd = self._build_unix()
            
            # Run CMake if needed (first time setup)
            if cmake_cmd:
                print("🔧 Running CMake configuration...")
                print(f"Command: {' '.join(cmake_cmd)}\n")
                cmake_result = subprocess.run(
                    cmake_cmd,
                    cwd=BUILD_DIR,
                    shell=False,
                    capture_output=True,
                    text=True
                )
                
                if cmake_result.returncode != 0:
                    print("❌ CMake configuration failed!")
                    print(f"Exit code: {cmake_result.returncode}")
                    if cmake_result.stdout:
                        print("\n📤 stdout:")
                        print(cmake_result.stdout)
                    if cmake_result.stderr:
                        print("\n📤 stderr:")
                        print(cmake_result.stderr)
                    return
            
            # Run build
            print("🔨 Building library...")
            print(f"Command: {' '.join(build_cmd)}\n")
            result = subprocess.run(
                build_cmd,
                cwd=BUILD_DIR,
                shell=False,
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                print("✅ Build successful!")
                print(f"📦 Library rebuilt: {changed_file.name}")
                
                # Generate documentation
                self._generate_docs()
                
                # Try to auto-reload via API if server is running
                if self._try_auto_reload():
                    print("🔄 Library automatically reloaded in FastAPI server!")
                else:
                    print("\n💡 Tip: Restart the FastAPI server or call POST /api/v1/engine/reload to reload the library")
            else:
                print("❌ Build failed!")
                print(f"Exit code: {result.returncode}")
                
                # Check for DLL locking error on Windows
                output_text = (result.stdout or "") + (result.stderr or "")
                if sys.platform == "win32" and "LNK1104" in output_text:
                    print("\n⚠️  DLL is locked by another process!")
                    print("   This usually means the FastAPI server is using the library.")
                    print("\n   Solutions:")
                    print("   1. Stop the FastAPI server, rebuild, then restart it")
                    print("   2. Or use the /api/v1/engine/reload endpoint after stopping the server")
                    print("   3. Or restart the server after the build completes")
                
                if result.stdout:
                    print("\n📤 stdout:")
                    print(result.stdout)
                if result.stderr:
                    print("\n📤 stderr:")
                    print(result.stderr)
                if not result.stdout and not result.stderr:
                    print("(No output captured)")
                
        except Exception as e:
            print(f"❌ Build error: {e}")
        finally:
            self.building = False
            print(f"{'='*60}\n")
    
    def _build_windows(self) -> list:
        """Get Windows build commands."""
        # Create build directory if it doesn't exist
        if not BUILD_DIR.exists():
            os.makedirs(BUILD_DIR, exist_ok=True)
        
        # Check if CMakeCache.txt exists in build directory
        cmake_cache = BUILD_DIR / "CMakeCache.txt"
        
        if not cmake_cache.exists():
            # First time setup - run CMake then build
            return [
                'cmake', '..'
            ], [
                'cmake', '--build', '.', '--config', 'Release'
            ]
        else:
            # Just build
            return None, [
                'cmake', '--build', '.', '--config', 'Release'
            ]
    
    def _build_unix(self) -> tuple:
        """Get Unix/Linux/Mac build commands."""
        # Create build directory if it doesn't exist
        if not BUILD_DIR.exists():
            os.makedirs(BUILD_DIR, exist_ok=True)
        
        # Check if CMakeCache.txt exists in build directory
        cmake_cache = BUILD_DIR / "CMakeCache.txt"
        
        if not cmake_cache.exists():
            # First time setup - run CMake then build
            return [
                'cmake', '..'
            ], [
                'make'
            ]
        else:
            # Just build
            return None, [
                'make'
            ]


def main():
    """Main function to start the hot-reload watcher."""
    print("🚀 Engine Hot-Reload Started")
    print(f"📁 Watching: {ENGINE_DIR}")
    print("👀 Monitoring for changes in .cpp, .h, .hpp, .c files...")
    print("\nPress Ctrl+C to stop\n")
    
    # Create event handler
    event_handler = EngineBuildHandler()
    
    # Create observer
    observer = Observer()
    observer.schedule(event_handler, str(ENGINE_DIR), recursive=True)
    
    # Start watching
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping hot-reload watcher...")
        observer.stop()
    
    observer.join()
    print("👋 Hot-reload stopped")


if __name__ == "__main__":
    main()
